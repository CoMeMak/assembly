# assembly
An open source, web-based robot programming environment

## Philosophy

Assembly is an easy to use web-based robot programming environment, which builds on a new visual, block-based programming paradigm. Assembly builds on a simple programming model, which is reminiscent of the blackboard design pattern. The system maintains the context in three JSON objects, called "Params", "Vars" and "Robot", which represent the blackboard of the system. Programs are composed of function blocks, called actors, which can be linked together to form a visual workflow. The visual workflow encompasses program semantics, which can be used to generate code in any programming language. Assembly thus uses the same working principle as Blockly; only that it aims to be easier to use and to extend. As opposed to Blockly, in Assembly there are only three types of blocks (or actors, as we call them):

- Non-parameterizable actors: Actors, which do not use any parameters, such as the "else" and "terminator" actors.
- Implicitly parameterizable actors: Actors, which use variables and parameters from the blackboard but neither explicitly expose them nor require user-defined values for them, such as the move actors. 
- Explicitly parameterizable actors: Actors, which expose one variable, the value of which needs to be set by the user in order for the actor to poduce a meaningful effect, such as conditional and loop structures. 

Assembly workflows are to be read left to right, like a text. There is not explicit indentation--only a linear flow of effects caused by the actors composing the workflow. This allows programmers to think of a workflow as of a narrative, i.e., a more o less complex phrase, which achieve a desirable effect. Each actor then stands for a sentece, which 
