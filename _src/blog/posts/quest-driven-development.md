---
title: Quest Driven Development
date: 2021-03-10
layout: layouts/post.njk
category: meta
tags:
  - ideas
  - tech
  - QDD
---

_Quest Driven Development_ is an expressive approach to writing game stories and interactive fiction that leaves coding and implementation to software, so writers can focus on narrative and world-building. This approach can highlight inconsistencies or problems as potentially clashing narrative branches are woven together, allowing a writer to correct errors or inconsistencies as they go.

Currently _Quest Driven Development_ is in the concept phase, but the problem and solution space is generally well understood. This post is a brief overview of its ideas.

The approach itself and infrastructure tooling is [open-source](https://github.com/rendall/quest-driven-development) (nothing hidden, and you can contribute) under the [standard MIT License](https://github.com/rendall/quest-driven-development/blob/master/LICENSE) (use it however you want, commercially or not, heck launch a business with it), and uses the [all-contributors specification](https://allcontributors.org/docs/en/overview), which honors every contributor and contribution, both technical and non-technical.

## Introduction

Story-rich games, interactive fiction, branching narratives of all sorts including even bog-standard fetch quests all have the same underlying abstract structure. Leveraging principles from theory and practice in other areas of software development can improve the design, writing and programming of branching narratives.

A branching narrative creator can, using _Quest Driven Development_, focus on the over-arching story, narrowing in on story details as needed, all while leaving actual implementation details such as variable values, error checks and if-then conditionals to software infrastructure and tooling.

When mature, this approach allows:

- automatically testing the narrative structure for errors and incompletable states;
- tracking narrative events and their consequences in world-building;
- visualizing the narrative structure as a whole or in part;
- interactively navigating and "getting a feel for" the narrative structure without needing to encode changes into the game platform;
- automatic code generation using the narrative itself as a template, rather than programming the narrative by hand;
- enable porting of game narratives into different platforms;
- data-gathering about the popularity and difficulty of various narrative structures.

As time goes on and the approach matures even further, it should be possible to procedurally generate coherent, unique branching narrative structures, for nearly infinite narratives.

Given the similar structures that quests share with well-understood problems in software development, current best practices and solutions to these problems can be leveraged to handle or even solve them.

As a minor point, a _quest_ is a goal-oriented subset of the general _branching narrative_, but _Quest Driven Development_ itself can apply to any style of branching narrative, not only quests. _Quest Driven Development_ is however a snappier name than _Branching Narrative Driven Development_

## Theory

Quests and branching narratives in general correspond to some well-understood mathematical constructs in mathematics and computer science. If this does not interest you in the least, feel free to skip down to the [Practice](#practice) section below.

### Finite state machines

A [finite state machine (FSM)](https://en.wikipedia.org/wiki/Finite-state_machine) is an idea from computer science, an abstract machine which has a specific number of _states_. A [_state_](<https://en.wikipedia.org/wiki/State_(computer_science)#Program_state>) can here entirely describe the player's position along a narrative arc as the result of any past decisions or actions. Some of the possible decisions at a given state will _transition_ the narrative arc from the current state to another state. In this way, a quest can be described as a finite state machine (or, rather, this essay applies only to those interactive narratives that fit the structure of a finite state machine). A _terminal state_ for our purposes is a state that ends, or narratively concludes, the quest.

### Graph theory

A finite state machine, and therefore a quest, can be described as a directed graph, where _nodes_ of the graph are _states_, and _edges_ of the graph are specific actions or decisions which transition the quest from one state to the next. This is wonderful news, because graphs, finite state machines, and therefore quests, have available an intuitive visualization and a rich knowledge base for reasoning about them.

### Regular expressions

A finite state machine can be entirely described by a regular expression. This is a minor point that may not be useful for _writing_ quests, but may be useful for _testing_ quests. What this would mean in practice is that a regular expression engine could be leveraged to test whether any given sequence of actions would lead to an ending (or _terminal state_).

## Practice

A _state_ as described above can roughly correspond to a scene in a play or an episode in a long-arc TV series: the scenario the characters find themselves in are due to the result of all previous decisions, and the _transition_ corresponds to decisions or actions that move characters into new scenarios. A narrative constructed with this structure can leverage the theory outlined above _and_ the practices outlined below.

### Development environment

As an _approach_ rather than as a specific software solution, _Quest Driven Development_ can accommodate all manner of writing styles and preferences.

In the abstract, a branching narrative writer will need an interface that outputs structured data objects which in turn are consumed by either an interpreter, compiler, testing platform or other game development platform. The actual nature of the development environment is flexible and can accommodate any sort of file format, from Word and text files, to spreadsheets, dynamic forms and widgets, to visual programming.

Practically, the structured data for a single scene of a larger narrative would look something like this:

```json
{
  name: "Stella reads the journal",
  description: "After Fisk's betrayal and the loss of her medalion,
  Stella in despair flips randomly through Grandma Pluck's journal.
  There, she discovers how exactly the cult intends to summon the
  End of Times. But what does she do with this knowledge?",
  decisions: [
    {action:"tell-fisk", result:"fisks-second-betrayal"},
    {action:"do-nothing", result:"arrival-of-the-eschaton"},
    {action:"try-stop-cult", result:"resolve-attempt"}
  ]
  ...
}
```

Software can consume and use such objects to map out the narrative structure, test it and even transform it into cold, hard code.

### State management

The consequences of decisions can overlap and interfere with each other. In a large game, a narrative can become inconsistent: a decision made by the player may not be reflected in the game state later, and almost never in conversation with a minor character at any point. Worse, certain quests or the game itself may [enter into an incompletable state](https://duckduckgo.com/?q=quest+incompletable&ia=web), infuriating and disappointing players.

Under the hood, a state is a collection of variables and their values, and a transition is a change to the value of one or more of these variables. Manipulating values directly is to transition unpredictably in an unmapped, unexplored state machine. Keeping track of all of these values so that they behave in an expected and consistent way is called _state management_, and there are approaches to do this.

In _Quest Driven Development_, the writer is encouraged to think of state not as a collection of variable-values, but as a branching-point in an narrative. Transitions are not to be thought of as changes to variables, but as possible decisions by the player that advance the story.

### Automated testing

The internet is replete with plaintive posts from disappointed or infuriated players who cannot complete a quest or an entire game because of a broken quest. Quest Driven Development allows the narrative structure to be automatically explored and tested, flagging potential errors and inconsistencies. The narrative structure can be developed and tested in parallel and distinct from the underlying game platform.

### X Driven Development

Generally, _X_ Driven Development (e.g. _Test Driven Development_, _Behavior Driven Development_, _Feature Driven Development_) are approaches to _software_ development that emphasize the _X_ part, usually by crafting the development environment so that the _X_ can be written or developed first. In _Test_ Driven Development, developers write tests that fail, and then write software so that the test will pass. Similarly, in _Behavior_ Driven Development, development teams decide what behavior the software should have and write _expressive_ synopses of this behavior.

The advantages of this approach is that the application has a series of automated tests that describe what the software should do, and importantly, can identify immediately when later additions to the software introduces bugs.

#### Quest Driven Development

Likewise, _Quest Driven Development_ emphasizes the stories that a game wants to tell. As the game progresses, a series of quest objects are created that can be continually tested against, to ensure that later additions are coherent, potential bugs or narrative consistencies are highlighted, and [all quests are all completable](https://duckduckgo.com/?q=game+quest+incompletable&ia=web).

## Hence

_Quest Driven Development_ is a only an idea in its initial, conceptual phase. To be able to move beyond that into actually helping the community of story-driven game developers, I propose this list of future steps.

- Contributions: As a greenfield, interdisciplinary concept, the field is wide open for contributions.
  - Ideas for improvement
  - User-interface and developer experience
  - Helpful theory and resources
  - Game developers and writers who would consider using it:
    - What would you need to begin using the QDD approach?
      - Tooling?
      - Development environment?
      - Tutorial?
  - There are several channels to contribute and give feedback
    - Create a [new issue](https://github.com/rendall/quest-driven-development/issues/new) on the [github repo](https://github.com/rendall/quest-driven-development)
    - Comment below on this blog post
    - Create a [pull request](https://github.com/rendall/quest-driven-development/pulls) for code or documentation
    - Create or edit a page [on the wiki](https://github.com/rendall/quest-driven-development/wiki)
    - Others? Discord or Slack? [What do you think?](https://github.com/rendall/quest-driven-development/issues/new)
- Praxis: Culturally, the idea must be wedded and welded to actual development, not merely remain a theoretical idea
  - Pay particularly close attention to how game developers work and what they say
- Roadmap: Phases, steps to maturity
  - Requests for comment, discussion and resources
  - Small games and quests, with input from active game developers
  - Tooling, such as JSON schema, testing frameworks, user interfaces
  - Automated code generation
    - Tools that convert structured data to code
    - Unity plugin
  - Procedural generation
- Culture:
  - Friendly and open, to newbies and non-technical people in particular,
  - Honoring of all contributions from all contributors
  - As an untested idea, _QDD_ very well may be an impractical dead end.
    - Advocates but not activists
    - Practice detachment from outcome

## Resources

In no particular order, nor even guaranteed relevance:

[Interaction of Finite State Machines and Concurrency Models (pdf)](https://ptolemy.berkeley.edu/publications/papers/98/InteractionFSM/InteractionFSM.pdf)
[Interactive Visualizations of Plot in Fiction (pdf)](http://blogs.ubc.ca/lled4492015/files/2015/07/Interactive-Visualizations-of-Plot-in-Fiction.pdf)
[SCXML specification](https://www.w3.org/TR/scxml/)
[Statecharts website](https://statecharts.github.io/)
[Statecharts: a visual formalism for complex systems](https://www.sciencedirect.com/science/article/pii/0167642387900359?via%3Dihub)
[xstate (state management and visualization library)](https://github.com/davidkpiano/xstate)
