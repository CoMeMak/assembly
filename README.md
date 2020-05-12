# assembly
An open source, web-based robot programming environment

## Introduction

Assembly is an easy to use web-based robot programming environment, which builds on a new visual, block-based programming paradigm. Assembly builds on a simple programming model, which is reminiscent of the blackboard design pattern. The system maintains the context in three JSON objects, called "Params", "Vars" and "Robot", which represent the blackboard of the system. Programs are composed of function blocks, called actors, which can be linked together to form a visual workflow. The visual workflow encompasses program semantics, which can be used to generate code in any programming language. Assembly thus uses the same working principle as Blockly; only that it aims to be easier to use and to extend. As opposed to Blockly, in Assembly there are only three types of blocks (or actors, as we call them):

- Non-parameterizable actors: Actors, which do not use any parameters, such as the "else" and "terminator" actors.
- Implicitly parameterizable actors: Actors, which use variables and parameters from the blackboard but neither explicitly expose them nor require user-defined values for them, such as the move actors. 
- Explicitly parameterizable actors: Actors, which expose one variable, the value of which needs to be set by the user in order for the actor to poduce a meaningful effect, such as conditional and loop structures. 

### Philosophy

Assembly workflows are to be read left to right, like a text. There is not explicit indentation--only a linear flow of effects caused by the actors composing the workflow. This allows programmers to think of a workflow as of a more o less complex phrase, which--when properly formulated--achieves a desired effect. Each actor may thus be regarded as being a short sentence in a phrase. At the same time, actors emcompass the semantics necessary to generate code in a C-style programming language, altough the visual representaiton does not use brackets and accolades--with the notable exception of terminators, which close conditinal, loops, and try-catch structures.

A meaningful workflow can be saved as a task, which can be reused within other tasks. Using the phrase metaphor, tasks may be regarded as expressions or idioms which one creates or learns from ohers over time. On the practical side (<< this is an idiom), tasks are an easy way to organize robot programs. In Assembly, tasks are simply stored in the browser's bookmarks bar. Loading a task then simply means clicking on a browser bookmark.
