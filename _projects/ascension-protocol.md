---
title: Ascension Protocol
description: Intense spatial VR experience built with a custom C++ OpenXR engine. Face enemy swarms from all directions, where failure causes the ground to crumble while success leads to ascension.
image: /assets/img/projects/ascension-protocol.gif
tags: [C++, Custom Engine, OpenXR, Group Project, CI/CD]
tech_stack: [Python 3.11, Django 4.2, PostgreSQL, Docker, Redis, Celery]
order: 1
date: 2025-06-26
# github: https://github.com/yourusername/project-name
itchio: https://buas.itch.io/ascension-protocol
team_size: 14
duration: 2 months
responsibilities:
  - Programming Lead
  - OpenXR Implementation
  - In-engine editor
  - CI/CD - GitHub Actions & Perforce
  - Gameplay & Navigation
---

## Overview

> *In the end they have reached the core. You represent our final struggle. Push against endless and overwhelming odds. Overcome your limits, your fears and ascend.*

A VR experience pushing the boundaries of your spatial awareness by pitting you against swarms of enemies from all sides. Deflect, Dodge and Defend what is yours - if you fail, the very ground you stand upon will crumble as it leaves you with less and less. If you succeed, ascend a step further towards salvation.

This game was entirely created with the Mantis Engine, our custom C++ VR engine using OpenXR.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/r9AC-AtrcQo?si=UKQbUuT3RsjItcfn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/pc8jxNV2bAw?si=n5Rs2VC2kQDlqNKp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## My contributions
### Programming Lead
As programming lead, I guided both technical development and team coordination across the 8-week project cycle.
- **Facilitated key meetings:** Led concepting, sprint planning, reviews and retrospectives with a structured approach.
- **Stakeholder communication:** Communicated progress to external stakeholders through regular update presentations.
- **Conflict resolution:** Addressed team communication issues through direct conversations and mediation.
- **Coordination & scope:** Managed programming team workload and cross-discipline collaboration.

### OpenXR Implementation
I built upon my OpenXR implementation from the previous project.

#### Session Handling
Previously we were not handling any changes to the VR session. This meant that you could not close, pause, or re-connect to the application (e.g. if the cable got loose) from the headset.

This worked for a while as we were just starting & stopping the game through Visual Studio, but obviously doesn’t work when we ship to external users.

To fix this I query the relevant system events through the OpenXR API. The user can then set a callback for their specific engine.

For re-connecting after the session is lost, I destroy all session related objects and query for a new SystemID on a reasonable interval. When the user re-connects I re-create all of the relevant objects (e.g. swapchains).

{% include embed/video.html src="/assets/img/projects/ascension-protocol/xr_session_handling.mp4" title="OpenXR Session Management - Pausing & Quitting" autoplay=true loop=true muted=true playsinline=true controls=true %}

```c++
if (m_lostConnectionToHMD)
{
    if (m_sessionRunning)
    {
        DestroySessionObjects();
        m_sessionRunning = false;
    }

    auto now = std::chrono::steady_clock::now();
    if (now - m_lastConnectionAttemptTime > CONNECTION_ATTEMPT_INTERVAL)
    {
        m_lastConnectionAttemptTime = now;

        TryReestablishSession();
    }
}
```

#### Blit VR view to PC screen
Since the VR panel resolution and PC window resolution do not match, this can lead to weird results where the image is stretched and scaled.
This makes it hard to see what is going on, especially at playtests where you'd like to see what the player is seeing.

To fix this, I implemented resolution-aware scaling of the frame buffer to the screen

```c++
const int screenWidth = Engine.Device().GetWidth();
const int screenHeight = Engine.Device().GetHeight();
const float srcAspect = static_cast<float>(m_width) / m_height;
const float dstAspect = static_cast<float>(screenWidth) / screenHeight;

int dstX0, dstY0, dstX1, dstY1;

if (dstAspect > srcAspect)
{
    // Screen is wider than render target
    int newWidth = static_cast<int>(screenHeight * srcAspect);
    dstX0 = (screenWidth - newWidth) / 2;
    dstY0 = 0;
    dstX1 = dstX0 + newWidth;
    dstY1 = screenHeight;
}
else
{
    // Screen is taller than render target
    int newHeight = static_cast<int>(screenWidth / srcAspect);
    dstX0 = 0;
    dstY0 = (screenHeight - newHeight) / 2;
    dstX1 = screenWidth;
    dstY1 = dstY0 + newHeight;
}

// Clear the screen to prevent artifacts
glBindFramebuffer(GL_FRAMEBUFFER, 0);
glViewport(0, 0, screenWidth, screenHeight);
glClearColor(0.0f, 0.0f, 0.0f, 1.0f);
glClear(GL_COLOR_BUFFER_BIT);

// Blit framebuffer to the screen
glBindFramebuffer(GL_READ_FRAMEBUFFER, m_finalFramebuffer);
glBindFramebuffer(GL_DRAW_FRAMEBUFFER, 0);
glReadBuffer(GL_COLOR_ATTACHMENT0);
glDrawBuffer(GL_BACK);
glBlitFramebuffer(0, 0, m_width, m_height, dstX0, dstY0, dstX1, dstY1, GL_COLOR_BUFFER_BIT, GL_NEAREST);
```

<!-- - Smooth locomotion -->
<!-- - VR/non-VR build configurations -->

### In-engine editor
I extended our ImGui-based in-engine editor with dockable panels, scene serialization and instantiating from the asset browser.

{% include embed/video.html src="/assets/img/projects/ascension-protocol/editor_and_serialization.mp4" title="Managing editor panels, serializing scene with OS dialog" autoplay=true loop=true muted=true playsinline=true controls=true %}
![Asset browser instantiation](/assets/img/projects/ascension-protocol/asset_instantiate.gif)
*Instantiating asset from the asset browser*

### CI/CD - GitHub Actions & Perforce
To critically check mine and my team's work before integration, I set up and updated our GitHub Actions pipeline to perform build checks and C++ linting.
![GitHub Actions](/assets/img/projects/ascension-protocol/github_actions.png)
*GitHub Actions checks on a Pull Request*

I also worked on the Jenkins Pipeline to set up MSBuild & Perforce integrations.
![Jenkins Pipeline](/assets/img/projects/ascension-protocol/jenkins.png)
*Jenkins build pipeline*

### Gameplay & Navigation
I also helped in implementing various gameplay features throughout the project. Here are some highlights:

#### Gem Pull, Highlight & Navigation
I further refined the gem interactions to have a consistent highlight when in aim, and iterated on the force pull mechanic to make it more satisfying and predictable.

![Highlight & Force-pull gem](/assets/img/projects/ascension-protocol/highlight_gem.gif)
*Highlight & Force-pull gem*

After implementing the gems, we found it could also function as a convenient in-world menu navigation tool.

I implemented a simple navigation system to easily place navigation gems, and call events when they are grabbed. I also iterated on the UI text to add text alignment for the menus.

![Navigation gems](/assets//img/projects/ascension-protocol/highlight_nav.gif)
*Navigation gems & UI*

#### UI Animation Widget
For the onboarding we were struggling to show players how to perform certain actions.

After we implemented the UI Image Widget, I considered if we could chain many of these images to play a simple animation/video.
I later implemented by changing the texture over a pre-loaded list of frames.

![UI Animation Widget](/assets/img/projects/ascension-protocol/anim_widget.gif)
*UI Animation Widget cycling through images*

<!-- ## Challenges -->

## What I Learned
- **Programming Leadership & Team Management:** Leading an 8-person PR team in a 14-person multi-disciplinary team taught me a lot about technical oversight and managing people.
  I learned to manage scope, project priorities and clear team communication. Balancing this Lead work together with my regular development work was quite a challenge - I would often try to do both 100% which is not possible. Learning to effectively plan and delegate the work instead proved successful.

- **Multi-disciplinary collaboration in custom engine:** Working together with artists & designers in a custom engine showed the importance of robust tooling and pipelines.
  I learned to communicate effectively on the needs of other disciplines to figure out their needs and our technical capability.

<!-- ## Future Improvements

- Publishing plugin to FAB - This is a process I started, but haven't completed yet. Will teach me more about documenting & packaging.
- Allowing further language customization - Fully switch out keywords, implement it in your native language with full Unicode support. -->