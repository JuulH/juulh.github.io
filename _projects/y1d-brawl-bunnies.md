---
title: Brawl Bunnies
description: Robo-engineered bunnies clash in electrifying class-based soccer matches. Punch & shoot the ball into the goal in fast-paced battles of skill and strategy!
image: /assets/img/projects/brawlbunnies.gif
tags: [C++, Python, Unreal Engine, Group Project, CI/CD]
order: 1
date: 2024-06-17
# github: https://github.com/yourusername/project-name
itchio: https://buas.itch.io/brawl-bunnies
team_size: 12
duration: 2 months
responsibilities:
  - CI/CD - Automatic Build & Deploy Pipeline
  - Ball physics & interactions
  - Barrier placement & preview
  - itch.io page & builds
---

## Overview

> Welcome to the world of Brawl Bunnies! Immerse yourself in a desert wasteland where robo-engineered bunnies clash in electrifying soccer matches. This class-based game, designed for 2-4 players offers exhilarating 1v1 or 2v2 action. Get ready for every match to be a thrilling test of skill, strategy, and teamwork as you punch the ball into the goals and strive for victory!

This was our first collaborative team project in year 1 of Creative Media and Game Technologies at BUas.

## My responsibilities
### CI/CD - Automatic Build & Deploy Pipeline
My personal research task was creating an automatic build pipeline.

I created a Python script that:
- Watches Perforce for changes;
- Uses the UnrealBuildTool to create a player-ready build;
- Uses itch.io's 'butler' tool to automatically deploy to a 'latest' beta branch;
- Sends messages over Discord Webhooks to communicate the status & errors of builds to the team.

This ended up being very beneficial to the team as we could quickly verify game-breaking issues and playtest the latest available version.

## What I Learned
- Working in a large team.
- Working with Unreal Engine for the first time.
- Creating CI/CD pipelines with UnrealBuildTool, Butler & Webhooks.
- Preparing a game page and build for release.