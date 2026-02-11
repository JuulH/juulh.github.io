---
title: InfiniGolf - Intake Project
description: An endlessly generated golf arcade game where your goal is to shoot the ball into the hole within 3 strokes and continuing for as long as you can.
image: /assets/img/projects/infinigolf/infinigolf.gif
tags: [C++, SDL, Solo Project]
tech_stack: [Python 3.11, Django 4.2, PostgreSQL, Docker, Redis, Celery]
order: 1
date: 2024-01-15
github: https://github.com/JuulH/CMGT-Intake
itchio: https://juulh.itch.io/infinigolf
team_size: Solo
duration: 1 week
responsibilities:
  - Custom input manager
  - Optimized 2D ball-line collision
  - Terrain generation & baking
  - UI system with buttons, images & text
---

## Overview

InfiniGolf was my intake project for the Creative Media and Game Technologies, Programming Track. Based on the theme 'Bounce' I created a simple endless golf game in the span of about a week.

<!-- ## My contributions -->

![Infinigolf UI](/assets/img/projects/infinigolf/infinigolf_ui.gif)

## What I Learned

Being my intake, this was also my first real C++ project - safe to say, I learned a lot.

- Working with C++ for the first time introduced me to various C++ concepts - classes, structs, various datatypes & the standard library.
- This project used the 3DGEP tutorial template using SDL. I learnt about input events & update loops.
- The infinite terrain introduced me to procedural generation, and how to make it fit within a pattern for gameplay purposes.
- Working with UI taught me about hierarchies, anchoring, dirty flags & UI programming.

## Future Improvements

- At the time I optimized my simple terrain drawing approach using lines by baking it to a texture. In hindsight, making the terrain using triangles would have likely been more efficient.