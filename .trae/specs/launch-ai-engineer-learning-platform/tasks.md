# Tasks
- [x] Task 1: Define the learner journey and curriculum architecture
  - [x] SubTask 1.1: Map the end-to-end beginner journey from signup to capstone completion
  - [x] SubTask 1.2: Define the six curriculum tracks, ordering, prerequisites, and outcomes
  - [x] SubTask 1.3: Define how lessons, projects, milestones, and capstones relate in the content model

- [x] Task 2: Design the interactive learning module experience
  - [x] SubTask 2.1: Specify the module template for step-by-step lessons with build tasks and outcomes
  - [x] SubTask 2.2: Define guided experiences for prompt exercises, vibe coding, terminal tasks, file management, debugging, and running code
  - [x] SubTask 2.3: Define beginner support patterns such as plain-language explanations, hints, error recovery, and progressive disclosure

- [x] Task 3: Specify the sandbox environment and project workflow
  - [x] SubTask 3.1: Define the sandbox layout including editor, file explorer, terminal, and one-click run
  - [x] SubTask 3.2: Specify project state persistence, run output handling, and safety constraints
  - [x] SubTask 3.3: Define how lessons launch projects directly into the sandbox with starter states

- [x] Task 4: Specify learner accounts, progress tracking, and profiles
  - [x] SubTask 4.1: Define signup, login, profile, and saved-state requirements
  - [x] SubTask 4.2: Define progress metrics for lessons, finished projects, commands learned, and skills gained
  - [x] SubTask 4.3: Define dashboard and profile views for progress history and project continuity

- [x] Task 5: Specify personalization and recommendation logic
  - [x] SubTask 5.1: Define learner inputs such as skill level, goals, and target job
  - [x] SubTask 5.2: Define recommendation rules for next lessons, projects, and tracks
  - [x] SubTask 5.3: Define how recommendations adapt after project completion or learner struggle

- [x] Task 6: Define the guided project catalog and capstone program
  - [x] SubTask 6.1: Specify the AI coding, CI/CD, and core technical project catalog entries
  - [x] SubTask 6.2: Define the five capstone projects, prerequisites, deliverables, and assessment criteria
  - [x] SubTask 6.3: Define project metadata including difficulty, estimated time, required tools, and skills unlocked

- [x] Task 7: Plan implementation slices and validation
  - [x] SubTask 7.1: Break delivery into MVP, phase 2, and capstone expansion milestones
  - [x] SubTask 7.2: Define acceptance criteria for curriculum, sandbox, accounts, tracking, recommendations, and projects
  - [x] SubTask 7.3: Identify validation needs including UX review, content QA, sandbox safety testing, and progress tracking verification

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 1 and Task 2
- Task 4 depends on Task 1
- Task 5 depends on Task 1 and Task 4
- Task 6 depends on Task 1
- Task 7 depends on Tasks 1 through 6
