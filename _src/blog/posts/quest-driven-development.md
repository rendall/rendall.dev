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

_Quest Driven Development_ is an expressive approach to writing game stories and interactive fiction that leaves coding and implementation to software, so writers can focus on narrative and world-building. This approach can highlight inconsistencies or problems as potentially clashing narrative branches are woven together, allowing writer to correct errors as they go.

Currently _Quest Driven Development_ is in the concept phase, but the problem and solution space is well understood in general, as outlined here.

## Introduction

Story-rich games, interactive fiction, branching narratives of all sorts including even bog-standard fetch quests all have the same underlying abstract structure. Leveraging principles from theory and practice in other areas of software development can improve the design, writing and programming of branching narratives.

### Examples

A _quest_ for the purpose of this essay can broadly be defined as a branching narrative with conclusive endings, and the assumption is that a _player_ (or user) is navigating this narrative towards one of these endings. While not every interactive narrative has conclusive endings, the kinds of stories discussed in this essay do.

In `Zork: The Great Underground Empire` there is a quest to find 10 distinct treasures and to place them into a display case, but the order in which they are found and displayed is not very important (it could be said that this quest is comprised of 10 sub-quests, each of which are themselves comprised of sub-sub-quests), and there are other endings besides (e.g. `You have been eaten by a grue.`).

In `Witcher 3`, there is a quest called `The Last Wish` in which the ostensible goal is to capture a djinn, but narratively this is only a MacGuffin: there are two success states ending this quest, one in which `Yennifer` and `Geralt` remain lovers and another in which they decide to become friends only. This is clearly significant in the narrative arc of their relationship.

## Theory

Quests (as defined above) and branching narratives in general correspond to some well-understood mathematical constructs in mathematics and computer science. If this does not interest you in the least, feel free to skip down to the [Practice](#practice) section below.

### Finite state machines

A [finite state machine (FSM)](https://en.wikipedia.org/wiki/Finite-state_machine) is an idea from computer science, an abstract machine which has a specific number of _states_. A [_state_](<https://en.wikipedia.org/wiki/State_(computer_science)#Program_state>) can here entirely describe the player's position along a narrative arc as the result of any past decisions or actions. Some of the possible decisions at a given state will _transition_ the narrative arc from the current state to another state. In this way, a quest can be described as a finite state machine (or, rather, this essay applies only to those interactive narratives that fit the structure of a finite state machine). A _terminal state_ for our purposes is a state that ends, or narratively concludes, the quest.

### Graph theory

A finite state machine, and therefore a quest, can be described as a directed graph, where _nodes_ of the graph are _states_, and _edges_ of the graph are specific actions or decisions which transition the quest from one state to the next. This is wonderful news, because graphs, finite state machines, and therefore quests, have available an intuitive visualization and a rich knowledge base for reasoning about them.

#### Regular expressions

A finite state machine can be entirely described by a regular expression. This is a minor point that may not be useful for _writing_ quests, but may be useful for _testing_ quests. What this would mean in practice is that a regular expression engine could be leveraged to test whether any given sequence of actions would lead to an ending (or _terminal state_).

## Practice

A _state_ as described above can roughly correspond to a scene in a play or an episode in a long-arc TV series: the scenario the characters find themselves in are due to the result of all previous decisions, and the _transition_ corresponds to decisions or actions that move characters into new scenarios. A narrative constructed with this structure can leverage the theory outlined above _and_ the practices outlined below.

_"That's all well and good, but how does this actually help interactive fiction writers?"_

When mature, this approach allows: automatically testing the narrative structure for errors and incompletable states; keeping track of events and their consequences in world-building; visualizing the narrative structure as a whole or in part; interactively navigating and "getting a feel for" the narrative structure without needing to encode the changes into the game; automatic code generation using the narrative itself as a template, rather than programming the narrative by hand. As time goes on and the approach matures even further, it should be possible to generate entire narrative structures, for nearly infinite narratives.

Given the similar structures that quests share with well-understood problems in software development, current best practices and solutions to these problems can be leveraged to handle or even solve them.

### Development environment

In the abstract, a branching narrative writer will need an interface that outputs structured data objects which in turn are consumed by either an interpreter, compiler, testing platform or other game development platform. The actual nature of the development environment is flexible and can accommodate any sort of writing style, from Word and text files, to spreadsheets, dynamic forms and widgets, to visual programming.

Practically, the structured data for a single scene of a larger narrative would look something like this:

```json
{
  name: "Stella reads the journal",
  description: "After Fisk's betrayal and the loss of her medalion,
  Stella in despair flips randomly through Grandma Pluck's journal.
  There, she discovers how exactly the cult intends to summon the
  End of Times. But what does she do with this knowledge?",
  decisions: [
    {action: "tell-fisk", result:"fisks-second-betrayal"},
    {action:"do-nothing", result:"arrival-of-the-eschaton"},
    {action:"try-stop-cult", result:"resolve-attempt"}
  ]
  ...
}
```

Software can consume and use such objects to map out the narrative structure, test it and even transform it into cold, hard code.

### State management

The consequences of decisions can overlap and interfere with each other. In a large game, a narrative can become inconsistent: a decision made by the player may not be reflected in the game state later, and almost never in the conversation of a minor character at any point. Worse, certain quests or the game itself may [enter into an incompletable state](https://duckduckgo.com/?q=quest+incompletable&ia=web), infuriating and disappointing players.

Under the hood, a state is a collection of variables and their values, and a transition is a change to the value of one or more of these variables. Manipulating values directly is to transition unpredictably in an unmapped, unexplored state machine. Keeping track of all of these values so that they behave in an expected and consistent way is called _state management_, and there are approaches to do this.

In _Quest Driven Development_, the writer is encouraged to think of state not as a collection of variable-values, but as a branching-point in an narrative. Transitions are not to be thought of as changes to variables, but as possible decisions by the player that advance the story.

### Automated testing

The internet is replete with plaintive posts from disappointed or infuriated players who cannot complete a quest or an entire game because of a broken quest. Quest Driven Development allows the narrative structure to be automatically explored and tested, flagging potential errors and inconsistencies. The narrative structure can be developed and tested in parallel and distinct from the underlying game platform.

### X Driven Development

Generally, _X_ Driven Development (e.g. _Test Driven Development_, _Behavior Driven Development_, _Feature Driven Development_) are approaches to _software_ development that emphasize the _X_ part, usually by crafting the development environment so that the _X_ can be written or developed first. In _Test_ Driven Development, developers write tests that fail, and then write software so that the test will pass. Similarly, in _Behavior_ Driven Development, development teams decide what behavior the software should have and write _expressive_ synopses of this behavior.

The advantages of this approach is that the application has a series of automated tests that describe what the software should do, and importantly, can identify immediately when later additions to the software introduces bugs.

### Quest Driven Development

Likewise, _Quest Driven Development_ emphasizes the stories that a game wants to tell. As the game progresses, a series of quest objects are created that can be continually tested against, to ensure that later additions are coherent, potential bugs or narrative consistencies are highlighted, and [all quests are all completable](https://duckduckgo.com/?q=game+quest+incompletable&ia=web).

### Resources

[Interactive Visualizations of Plot in Fiction](http://blogs.ubc.ca/lled4492015/files/2015/07/Interactive-Visualizations-of-Plot-in-Fiction.pdf)
