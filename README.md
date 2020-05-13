# assembly
An open source, web-based robot programming environment

## Introduction

Assembly is an easy to use web-based robot programming environment, which builds on a new visual, block-based programming paradigm. Assembly builds on a simple programming model, which is reminiscent of the blackboard design pattern. The system maintains the context in three JSON objects, called "Params", "Vars" and "Robot", which represent the blackboard of the system. Programs are composed of function blocks, called actors, which can be linked together to form a visual workflow. The visual workflow encompasses program semantics, which can be used to generate code in any programming language. Assembly thus uses the same working principle as Blockly; only that it aims to be easier to use and to extend. As opposed to Blockly, in Assembly there are only three types of blocks (or actors, as we call them):

- Non-parameterizable actors: Actors, which do not use any parameters, such as the "else" and "terminator" actors.
- Implicitly parameterizable actors: Actors, which use variables and parameters from the blackboard but neither explicitly expose them nor require user-defined values for them, such as the move actors. 
- Explicitly parameterizable actors: Actors, which expose one variable, the value of which needs to be set by the user in order for the actor to poduce a meaningful effect, such as conditional and loop structures. 

### Philosophy

Assembly programs or workflows are to be written and read left to right, like a text in English or other Indo-European languages. Unlike in textual programming languages, there is no explicit indentation, only a linear enchaining of actor instances, which form a worflow and produce effects in the blackboard. A workflow may be conceived of as a more o less lengthy and complex phrase, which--when properly formulated--achieves the desired effect. Consequently, each actor instance may be regarded as being a short sentence in that phrase. At the same time, actors emcompass the semantics necessary to generate code in textual programming languages.

## Programming Concepts and Entities

### Actors

### The Blackboard

### Tasks

A workflow can be saved as a task, which can be reused within other workflows. Tasks are an easy way to organize robot programs. In Assembly, tasks are simply stored in the browser's bookmarks bar and can be loaded by clicking on that bookmark. Task collections can be organized in folders and exported using the browser's bookmarks management features. Tasks can also be easily shared on web sites and dragged by users onto their browser's bookmarks bar. 

### The Simulator

### The Robot
