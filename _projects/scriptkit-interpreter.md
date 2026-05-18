---
title: ScriptKit - In-game interpreter plugin
description: A custom programming language & interpreter for programming games in Unreal Engine.
image: /assets/img/projects/scriptkit-interpreter.gif
tags: [C++, Unreal Engine, Solo Project]
order: 0
date: 2024-01-15
# github: https://github.com/yourusername/project-name
# demo: https://project-demo.com
team_size: Solo
duration: 2 months
responsibilities:
  - Compiler & Interpreter from scratch
  - Blueprint function reflection & registration
  - Developer settings, delegates & Blueprint
---

## Overview

ScriptKit is a C++ Unreal Engine plugin that enables developers to create coding-based gameplay experiences through a custom Lox-inspired language.

Games like [The Farmer was Replaced](https://store.steampowered.com/app/2060160/The_Farmer_Was_Replaced/){:target="_blank"} & [RoboMind](https://www.robomind.net/){:target="_blank"} show that there is an increased interest in games where programming is the main mechanic, whether for educational purposes or just as gameplay. For this personal project I set out to create a plugin that would make it easy for developers to create programming gameplay in Unreal Engine.

## My contributions

### Custom programming language: Flex
No programming game is the same. You might want for loops and custom function calls, or none at all - you might want it to be in English, or you might want it to be in your native language.

To allow the developer full customization of the language, and to gain a better understanding of programming languages & compilers, I decided to make my own **custom programming language from scratch**. Following the [Crafting Interpreters book by Robert Nystrom](https://craftinginterpreters.com/){:target="_blank"}, I implemented a custom **bytecode compiler & interpreter** with type-erased variables (using `std::variant` & `std::visit`), operators, for & while loops and if-else statements as well as various standard library functions.

<video class="img-fluid rounded" autoplay muted loop playsinline>
  <source src="{{ '/assets/img/projects/scriptkit-interpreter/types_and_variables.mp4' | relative_url }}" type="video/mp4">
</video>  
*Video showcasing Flexlang running on the terminal with variables & statements*

### Unreal Engine integration
<!-- Developer settings, Blueprint functions, WBP UI -->
For ease of development I implemented my interpreter as a separate library, which I included as a **submodule** in my Unreal plugin repo.

To make the interpreter accessible & customizable to the end-user, I created a subsytem which holds the interpreter state. This exposes simple Blueprint nodes usable in Widget Blueprint UI.

For more custom behavior, I also added user-defined events that can e.g. trigger a restart of the level when the interpreter finishes executing. I also added logging interfaces that the user can attach any custom UI to.

Finally, I added UDeveloperSettings that expose things like execution speed and standard library function configurations for further control over the interpreter.

{% include embed/video.html src="/assets/img/projects/scriptkit-interpreter/logging.mp4" title="Logging interface connected to WBP UI" autoplay=true loop=true muted=true playsinline=true controls=true %}
<!-- *Video of logging interface connected to WBP UI* -->

![Events Blueprint](/assets/img/projects/scriptkit-interpreter/events.png)
*C++ delegates exposed to Blueprint - used to reset level*

{% capture tech_impl_content %}
To prevent the game from hanging during script execution (imagine being stuck in an infinite loop inside of the game), I split up the execution into single bytecode steps.

Using an accumulator, we can even have the user customize the execution speed (e.g. a temporary 'fast-forward' button).

```c++
void UFlexInterpreterSubsystem::Tick(float DeltaTime)
{
	if (!bIsInterpreterRunning || bIsInterpreterPaused) return;

	AccumulatedTime += DeltaTime;
	while (AccumulatedTime >= TimePerOpcode)
	{
		AccumulatedTime -= TimePerOpcode;

		// Execute a single instruction
		flex::InterpretResult interpretResult = vm.Step();
		if (interpretResult != flex::InterpretResult::INTERPRET_STEP_OK)
		{
			if (interpretResult != flex::InterpretResult::INTERPRET_OK)
			{
				// Runtime error
				GEngine->AddOnScreenDebugMessage(-1, 10.f, FColor::Red, TEXT("Error interpreting script!"));
				OnRuntimeErrorDelegate.Broadcast();
			}
			else {
				// Reached end of script
				GEngine->AddOnScreenDebugMessage(-1, 10.f, FColor::Green, TEXT("OK!"));
			}
			StopScript();
			break;
		}
	}
}
```
{% endcapture %}
{% include details.html summary="**Technical implementation (read&nbsp;more)**" content=tech_impl_content %}


### Blueprint function binding
The programmed behavior will also differ per-game. You might script a robot navigating through a maze, or a turret shooting at hordes of enemies.

To easily allow developers to add custom behavior in the language, I added support for extending the standard library with Blueprint function bindings.

All the developer has to do, is add the **FunctionBindingComponent** and write the name of the Blueprint function. Using **UE reflection** magic, the component then automatically retrieves the UFunction, analyzes the parameter types and registers it to the interpreter, including proper **error logging for incorrect parameter types**.

<video class="img-fluid rounded" controls preload="metadata">
  <source src="{{ '/assets/img/projects/scriptkit-interpreter/scriptkit_bpfunctionbinding.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>  
*Video showcasing Blueprint function binding to interpreter*

{% capture tech_impl_content2 %}
To call Blueprint functions from our script, we first need to find the user-created function, and then execute it on the specified actor instance. If the function has arguments, we also need to make sure that these match our function signature.

Using `Object->ProcessEvent(Function, Params);` we can call the Blueprint function by reference. We pass in a buffer which will contain our input parameters as well as a possible return value.

To handle the memory around the Params buffer safely, I created a simple RAII struct:

```c++
struct FParamsBuffer
{
	void* Buffer;
	UFunction* Function;

	FParamsBuffer(UFunction* InFunction)
		: Function(InFunction)
	{
		Buffer = FMemory::Malloc(Function->ParmsSize);
		FMemory::Memzero(Buffer, Function->ParmsSize);

		// Initialize non-trivial properties
		for (TFieldIterator<FProperty> It(Function); It && It->HasAnyPropertyFlags(CPF_Parm); ++It)
		{
			It->InitializeValue_InContainer(Buffer);
		}
	}

	~FParamsBuffer()
	{
		if (!Buffer) return;
		for (TFieldIterator<FProperty> It(Function); It && It->HasAnyPropertyFlags(CPF_Parm); ++It)
		{
			It->DestroyValue_InContainer(Buffer);
		}
		FMemory::Free(Buffer);
		Buffer = nullptr;
	}

	void* Get() const { return Buffer; }
};
```

Using a `TFieldIterator<FProperty>` we can then analyze and write into the buffer, and finally call the function with the method I described above. If there is a return value we extract it from the buffer and return it back to the user in the script.

```c++
flex::NativeReturn CallFunctionOnObject(TWeakObjectPtr<UObject> Object, TWeakObjectPtr<UFunction> FunctionToCall, std::span<flex::Value> Args)
{
	if (!Object.IsValid() || !FunctionToCall.IsValid())
	{
		UE_LOG(LogTemp, Warning, TEXT("Object or function is invalid"));
		return flex::NativeReturnCode::NATIVE_RUNTIME_ERROR;
	}

	UFunction* Function = FunctionToCall.Get();
	FParamsBuffer Params(Function);

	int32 ParamIndex = 0;
	bool bFailedMatch = false;

	for (TFieldIterator<FProperty> It(Function); It; ++It)
	{
		FProperty* Prop = *It;
		if (!Prop->HasAnyPropertyFlags(CPF_Parm) || Prop->HasAnyPropertyFlags(CPF_OutParm | CPF_ReturnParm))
			continue;

		if (ParamIndex >= Args.size())
		{
			bFailedMatch = true;
		}

		if (!bFailedMatch)
		{
			void* DestPtr = Prop->ContainerPtrToValuePtr<void>(Params.Get());
			if (!SetPropertyFromFlexValue(Prop, DestPtr, Args[ParamIndex], ParamIndex, Function->GetName()))
				bFailedMatch = true;
		}

		ParamIndex++;
	}

	if (ParamIndex < Args.size())
	{
		bFailedMatch = true;
	}

	if (!bFailedMatch)
	{
		Object->ProcessEvent(Function, Params.Get());
		return GetReturnValueFromBuffer(Function, Params.Get());
	}
	else if (ParamIndex != Args.size())
	{
		UE_LOG(LogTemp, Warning, TEXT("Function %s expects %d parameters, but %d were provided."), *Function->GetName(), ParamIndex, Args.size());
	}

	return flex::NativeReturnCode::NATIVE_INVALID_ARGUMENTS;
}
```
{% endcapture %}
{% include details.html summary="**Technical implementation (read&nbsp;more)**" content=tech_impl_content2 %}

<!-- ## Challenges & Solutions

One major challenge was handling concurrent user requests during peak times. I solved this by implementing a queueing system with Celery and optimizing database queries, which reduced response time from 2s to 200ms. -->

## What I Learned

This project taught me a lot about programming languages, compilers, Unreal Engine & working in large codebases.

- By building a programming language, compiler & interpreter from scratch I've demystified how these tools work in the tools I use day-to-day. I've learnt more about call stacks, call frames, assembly & data types.
- Making a custom C++ plugin for Unreal Engine has taught me more about UE and its underlying systems like Subsystems, DeveloperSettings, Delegates & Reflection.
- Working in Unreal Engine has taught me how to work in a large, existing codebase. You learn to work with both the tools that it gives you and the constraints you face.

## Future Improvements

- Publishing plugin to FAB - This is a process I started, but haven't completed yet. Will teach me more about documenting & packaging.
- Allowing further language customization - Fully switch out keywords, implement it in your native language with full Unicode support.