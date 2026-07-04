# AI Engineer Learning Platform Spec

## Why
Absolute beginners and non-technical users need a guided way to become AI Engineers without being blocked by jargon, fragmented tooling, or theory-heavy courses. This platform creates a supportive, project-based path where each concept is learned by building real AI products in a safe interactive environment.

## What Changes
- Add structured beginner-friendly curriculum tracks covering prompt engineering, AI coding, RAG, agents, systems thinking, and MLOps
- Add hands-on modules where every lesson includes guided building exercises and practical tasks
- Add an integrated beginner-friendly sandbox with editor, file explorer, terminal, and one-click run
- Add progress tracking for lessons, projects, terminal commands, and skills gained
- Add user registration, login, profile, saved projects, and learning history
- Add personalized next-step recommendations based on target role and current skill level
- Add guided project catalog for AI coding, CI/CD, core technical, and capstone projects
- Add support content and UX patterns for non-technical learners, including scaffolding, explanations, and gradual complexity

## Impact
- Affected specs: curriculum-management, interactive-learning, sandbox-runtime, user-accounts, progress-tracking, recommendation-engine, project-gallery, capstone-program
- Affected code: course content management, authentication flows, profile storage, sandbox orchestration, project persistence, recommendation services, dashboard UI, analytics/progress systems

## Detailed Design
### Learner Journey
1. Onboard with beginner-friendly signup, target-job selection, and self-reported skill level.
2. Enter a recommended starting track with clear outcomes and visible prerequisites.
3. Learn each concept through a short guided module tied to a concrete build artifact.
4. Launch directly into a sandbox with starter files, instructions, and safe run controls.
5. Save progress automatically across lessons, projects, terminal practice, and sandbox state.
6. Receive next-step recommendations based on goals, completions, and struggle signals.
7. Progress from guided projects to major capstones that combine multiple tracks.

### Curriculum Architecture
#### Track Order
1. Prompt Engineering & LLM Basics
2. AI Coding & Vibe Coding
3. RAG Systems & Knowledge Assistants
4. Agentic AI & Multi-Agent Systems
5. Software Systems Thinking & Architecture
6. MLOps, CI/CD & Production Deployment

#### Track Definitions
- Prompt Engineering & LLM Basics: teach model behavior, prompting patterns, iteration, and output evaluation through simple prompt-driven builds. Prerequisites: none.
- AI Coding & Vibe Coding: teach AI-assisted building, editor navigation, file awareness, debugging, and shipping small apps with coding agents. Prerequisites: completion of Prompt Engineering & LLM Basics or equivalent onboarding readiness.
- RAG Systems & Knowledge Assistants: teach grounding, retrieval flow, source-aware answers, and knowledge assistant design through real document-backed tools. Prerequisites: completion of Prompt Engineering & LLM Basics and AI Coding & Vibe Coding.
- Agentic AI & Multi-Agent Systems: teach task decomposition, tool use, role separation, and agent coordination through guided multi-step systems. Prerequisites: completion of AI Coding & Vibe Coding and RAG Systems & Knowledge Assistants.
- Software Systems Thinking & Architecture: teach how AI features fit into full products, including components, data flow, tradeoffs, and maintainability. Prerequisites: completion of AI Coding & Vibe Coding and at least one of RAG Systems & Knowledge Assistants or Agentic AI & Multi-Agent Systems.
- MLOps, CI/CD & Production Deployment: teach version control, testing, deployment, and production operations needed to move beginner projects into real environments. Prerequisites: completion of AI Coding & Vibe Coding and Software Systems Thinking & Architecture.

#### Content Model
- Lesson: the smallest learning unit, focused on one concept and one concrete action.
- Module: a sequence of lessons ending in a working artifact or milestone.
- Track Project: a larger guided build at the end of a curriculum track.
- Guided Project: a standalone project from the catalog that applies one or more track outcomes.
- Capstone: a multi-track final build with stronger autonomy, production readiness, and portfolio value.

### Learning Module Design
#### Standard Module Template
- Start: explain the concept in plain language, why it matters, and what the learner will build.
- Prepare: open the sandbox in a starter state with the right files, tools, and instructions already loaded.
- Build: guide the learner through short steps that directly apply the concept.
- Run: provide one-click execution with readable output and clear success criteria.
- Debug: offer hints, common mistakes, and recovery steps when the learner gets stuck.
- Reflect: summarize what was learned, what commands were used, and what skills were gained.
- Continue: recommend the next lesson, project, or prerequisite review.

#### Guided Beginner Activities
- Step-by-step prompt engineering exercises with side-by-side prompt revisions and output comparison.
- Vibe coding sessions where learners build apps with AI coding agents while learning how to inspect and improve generated code.
- Terminal and command line practice with guided commands, explanations, and safe retry paths.
- File management lessons that teach navigation, editing, project structure, and how files work together.
- Debugging lessons that normalize errors and show how to read messages, isolate issues, and fix problems safely.
- Build-from-scratch exercises for simple AI tools with no assumption of prior coding experience.

### Sandbox And Runtime
#### Beginner-Friendly Sandbox Layout
- Code editor for lesson and project files.
- File explorer for navigating project structure.
- Terminal for guided command practice and project execution.
- Output panel for logs, errors, and successful run results.
- One-click run control for simplified execution.
- Reset and resume controls for recovering or continuing work.

#### Sandbox Behavior
- Lessons and projects open with starter states matched to the current activity.
- The platform preserves open files, unsaved edits, terminal history, recent outputs, and lesson checkpoints.
- Run results distinguish user mistakes from system problems in plain language.
- Execution remains isolated with time, resource, and access limits suitable for a safe learning environment.
- The sandbox supports beginners first, but still exposes real files, commands, and code behavior.

### Accounts, Profiles, And Persistence
- Users can register, log in, log out, and resume learning across sessions.
- Profiles store name, target job, skill level, selected tracks, preferences, and learning history.
- Persistent state includes saved projects, active lessons, completed milestones, commands practiced, skills gained, and sandbox state.
- Returning learners land on their last active lesson, project, or dashboard context instead of restarting.
- Guest exploration may be supported, but creating an account preserves long-term progress and saved work.

### Progress Tracking
- Track lesson completion, module completion, project milestones, capstone milestones, terminal commands learned, and skills unlocked.
- Display current track progress, recent activity, saved projects, and recommended next actions on the dashboard.
- Show practical skills gained, such as prompt design, debugging, terminal basics, RAG setup, agent orchestration, and deployment workflow.
- Capture blocked or repeated-failure states so the system can offer more support or smaller next steps.

### Recommendation Logic
#### Recommendation Inputs
- Target role or learner goal
- Current skill level
- Selected or active track
- Completed lessons and projects
- Missing prerequisites
- Recent activity and return behavior
- Struggle signals such as repeated errors or abandoned steps

#### Recommendation Rules
- Prefer the next prerequisite-safe lesson or project over harder jumps.
- Reinforce weak areas before advancing to more complex builds.
- Offer smaller guided practice when the learner struggles.
- Prioritize momentum by recommending achievable next steps tied to the learner's goal.
- Explain each recommendation in simple language so the learner knows why it is suggested.

### Guided Project Catalog
#### AI Coding & Vibe Coding Projects
- Build a personal website using only AI coding agents.
- Create a simple chatbot using vibe coding.
- Build a Kanban board with AI assistance.
- Develop a basic note-taking app using Cursor or similar tools.
- Create a document generator using AI coding workflows.

#### CI/CD & Production Projects
- Set up a simple project with version control.
- Create a basic automated testing workflow.
- Build and run a project using terminal commands.
- Deploy a simple AI tool to a free hosting platform.
- Create a basic CI/CD pipeline for an AI project.

#### Core Technical Projects
- Build a RAG-based personal knowledge assistant.
- Create a multi-agent system for research.
- Develop an AI-powered brochure generator.
- Build a meeting minutes generator from audio or text.
- Create an AI code optimizer tool.

#### Project Metadata
- Each project includes difficulty, estimated time, prerequisites, required tools, learning goals, build steps, and expected deliverables.
- Each project maps back to one or more curriculum tracks and lists the skills unlocked on completion.

### Capstone Program
#### Capstone 1
- Title: Build a complete AI Digital Twin that represents the user professionally.
- Focus: combine prompt engineering, content generation, profile design, and deployment into a polished personal AI presence.
- Deliverables: working product, supporting assets, deployment output, and a short explanation of the system.

#### Capstone 2
- Title: Create an Autonomous Multi-Agent Research Team with tools and terminal usage.
- Focus: combine agents, tool use, task decomposition, and terminal workflows into an end-to-end research system.
- Deliverables: working multi-agent flow, tool orchestration, research outputs, and system documentation.

#### Capstone 3
- Title: Develop a Production-Ready RAG Knowledge Assistant with CI/CD deployment.
- Focus: combine retrieval, grounding, testing, deployment, and production workflow practices.
- Deliverables: working RAG assistant, deployment pipeline, validation flow, and operational notes.

#### Capstone 4
- Title: Build an AI Coding Agent Team that can create and maintain software projects.
- Focus: combine AI coding, agent collaboration, debugging, file management, and maintenance workflows.
- Deliverables: coordinated coding-agent system, maintained sample project, and collaboration workflow explanation.

#### Capstone 5
- Title: Create a full AI-Powered SaaS Product including prompt engineering, agents, RAG, and automated deployment.
- Focus: combine the full curriculum into a complete product from ideation through deployment.
- Deliverables: deployed SaaS product, technical architecture overview, project workflow, and portfolio-ready showcase.

#### Capstone Assessment
- Capstones require prerequisite track completion before unlock.
- Each capstone includes milestone-based progression, clear success criteria, and portfolio-oriented final outputs.
- Assessment covers working functionality, appropriate use of AI engineering concepts, clarity of explanation, and production readiness for the learner's level.

### Delivery Plan
#### MVP
- Deliver onboarding, account creation, profiles, progress dashboard, and an initial recommended beginner path.
- Launch the first curriculum tracks with the standard module template and guided beginner support patterns.
- Provide the sandbox with editor, file explorer, terminal, output panel, one-click run, and state persistence.
- Release initial guided projects across AI coding, CI/CD, and core technical categories.

#### Phase 2
- Expand all six tracks with richer lesson depth and more guided projects.
- Improve recommendation quality using progress history and struggle signals.
- Add stronger project resume flows, milestone tracking, and support interventions.

#### Phase 3
- Launch the full five-capstone program with prerequisites, milestones, and assessment criteria.
- Expand production-oriented deployment workflows and stronger systems-thinking content.
- Improve portfolio presentation so completed capstones clearly support job readiness.

### Acceptance Criteria
- A new learner can sign up, choose a target goal, and enter a beginner-friendly recommended path.
- Every live module includes plain-language explanations, step-by-step build tasks, and a concrete artifact.
- The sandbox exposes editor, file explorer, terminal, output, and one-click run while preserving user state.
- Progress tracking updates lessons, projects, commands learned, and skills gained after each completion event.
- Returning learners recover profile data, saved projects, learning history, and sandbox state.
- Recommendations reflect learner goals, current skill level, prerequisite completion, and struggle signals.
- The project catalog includes all requested AI coding, CI/CD, core technical, and capstone projects.
- The capstone program includes all five requested capstones with milestone-based progression and portfolio-ready outputs.
- Supportive UX explains new concepts clearly and helps users recover from mistakes without assuming technical background.

### Validation Plan
- UX review: run first-time learner walkthroughs from signup through first project completion to confirm low-intimidation flows and clear guidance.
- Content QA: review each lesson and module for plain-language explanations, build-first structure, prerequisites, and correct mapping to track outcomes.
- Sandbox safety testing: verify isolated execution, run limits, state persistence, output clarity, and safe handling of invalid commands or failing code.
- Progress tracking verification: confirm lesson, project, command, and skill events update the dashboard accurately after completion.
- Recommendation validation: test multiple learner personas to confirm next-step suggestions adapt to goals, prerequisites, and struggle signals.
- Project catalog audit: confirm all requested guided projects and capstones are present with metadata, prerequisites, and expected deliverables.

## ADDED Requirements
### Requirement: Structured Beginner Curriculum Tracks
The system SHALL provide clear, sequential curriculum tracks designed for absolute beginners and non-technical learners.

#### Scenario: Learner selects a track
- **WHEN** a learner opens the curriculum area
- **THEN** the system presents beginner-friendly tracks with clear names, outcomes, and recommended starting points

#### Scenario: Learner progresses through a track
- **WHEN** a learner completes lessons within a track
- **THEN** the system unlocks the next lessons in a logical sequence with visible progress

### Requirement: Project-Based Learning Modules
The system SHALL teach each concept through guided, hands-on building activities rather than theory alone.

#### Scenario: Learner starts a module
- **WHEN** a learner opens a learning module
- **THEN** the module includes step-by-step instructions, expected outcomes, and a concrete artifact to build

#### Scenario: Learner practices beginner technical skills
- **WHEN** a learner reaches lessons on terminal usage, file management, debugging, or running code
- **THEN** the system provides guided tasks with contextual explanations suitable for first-time users

### Requirement: Interactive Sandbox Environment
The system SHALL provide a safe interactive sandbox for writing, editing, running, and debugging beginner-level AI projects.

#### Scenario: Learner opens the sandbox
- **WHEN** a learner starts a hands-on lesson or project
- **THEN** the system shows a code editor, file explorer, terminal, and one-click run control in a beginner-friendly layout

#### Scenario: Learner runs project code
- **WHEN** a learner executes code in the sandbox
- **THEN** the system runs the project safely, surfaces output clearly, and preserves the learner's working state

### Requirement: Learning Progress Tracking
The system SHALL track and display progress across lessons, projects, commands learned, and skills gained.

#### Scenario: Learner completes a lesson
- **WHEN** a lesson or project milestone is completed
- **THEN** the learner dashboard updates completion progress, newly earned skills, and project history

#### Scenario: Learner reviews progress
- **WHEN** a learner visits their dashboard
- **THEN** the system summarizes completed lessons, finished projects, terminal commands learned, and current track progress

### Requirement: User Accounts And Persistent Profiles
The system SHALL provide registration, login, and persistent learner profiles with saved progress and projects.

#### Scenario: User signs up
- **WHEN** a new user creates an account
- **THEN** the system stores their profile, target goals, and initial learning state

#### Scenario: Returning learner resumes work
- **WHEN** an authenticated learner logs back in
- **THEN** the system restores their learning history, saved projects, and sandbox state

### Requirement: Personalized Learning Recommendations
The system SHALL recommend what to learn next based on learner goals and current progress.

#### Scenario: Learner specifies a target role
- **WHEN** a learner indicates a target outcome such as building AI apps or becoming an AI Engineer
- **THEN** the system suggests an appropriate learning path and recommended next modules

#### Scenario: Learner finishes a project
- **WHEN** a learner completes a project or milestone
- **THEN** the system recommends the next best lesson or project based on prerequisite completion and skill level

### Requirement: Guided Project Catalog
The system SHALL provide guided projects grouped by capability area and difficulty.

#### Scenario: Learner browses projects
- **WHEN** a learner opens the project catalog
- **THEN** the system organizes projects into AI coding, CI/CD and production, core technical, and capstone sections

#### Scenario: Learner opens a project
- **WHEN** a learner selects a guided project
- **THEN** the system shows prerequisites, learning goals, build steps, and expected deliverables

### Requirement: Core Curriculum Coverage
The system SHALL cover the requested learning areas and projects needed for a beginner-to-practitioner AI engineering journey.

#### Scenario: Learner reviews the curriculum map
- **WHEN** the learner inspects the full program
- **THEN** the system includes tracks for Prompt Engineering and LLM Basics, AI Coding and Vibe Coding, RAG Systems and Knowledge Assistants, Agentic AI and Multi-Agent Systems, Software Systems Thinking and Architecture, and MLOps, CI/CD and Production Deployment

#### Scenario: Learner reviews available projects
- **WHEN** the learner explores the project roadmap
- **THEN** the system includes AI coding projects, CI/CD projects, core technical projects, and five major capstone projects matching the defined outcomes

### Requirement: Supportive Beginner Experience
The system SHALL use supportive UX patterns that reduce intimidation while preserving real-world engineering practice.

#### Scenario: Learner encounters unfamiliar terminology
- **WHEN** a lesson introduces a new technical concept
- **THEN** the system explains it in plain language and connects it to the current project task

#### Scenario: Learner makes a mistake
- **WHEN** a learner hits an error while building
- **THEN** the system provides actionable guidance, debugging hints, and recovery steps appropriate for beginners

## MODIFIED Requirements
### Requirement: Learning Platform Experience
The learning platform SHALL prioritize gradual skill-building through real project work, combining guidance, sandbox execution, and production-oriented outcomes for complete beginners.

## REMOVED Requirements
### Requirement: Theory-Only Instruction
**Reason**: A theory-first experience does not align with the requested learning-by-building model for non-technical learners.
**Migration**: Existing concept lessons should be reframed as build-driven modules with short explanations directly tied to hands-on tasks.
