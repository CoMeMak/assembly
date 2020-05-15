# a s s e m b l y
An open source, web-based robot programming environment

## Introduction

Assembly is an easy to use web-based robot programming environment, which builds on a new visual, block-based programming paradigm. Assembly builds on a simple programming model, which is reminiscent of the blackboard design pattern. The system maintains the context in three JSON objects, called "Params", "Vars" and "Robot", which represent the blackboard of the system. Programs are composed of function blocks, called actors, which can be linked together to form a visual workflow. The visual workflow encompasses program semantics, which can be used to generate code in any programming language. Assembly thus uses the same working principle as Blockly; only that it aims to be easier to use and to extend. 
### Philosophy

Assembly programs or workflows are to be written and read left to right, like a text in English or other Indo-European languages. Unlike in textual programming languages, there is no explicit indentation, only a linear enchaining of actor instances, which form a worflow and produce effects in the blackboard. A workflow may be conceived of as a more o less lengthy and complex phrase, which--when properly formulated--achieves the desired effect. Consequently, each actor instance may be regarded as being a short sentence in that phrase. At the same time, actors emcompass the semantics necessary to generate code in textual programming languages.

## Programming Concepts

### Actors / Blocks

Assembly is a hybrid block and text-oriented visual programming environment. Blocks, which are also called actors, trigger robot actions or implement program logigic such as loops, conditional statements, etc. From a structural point of view, there are three main types of blocks (or actors, as we call them):

- **Non-parameterizable actors**: Actors, which do not use any parameters, such as the "else" and "terminator" actors.
- **Implicitly parameterizable actors**: Actors, which use variables and parameters from the blackboard but neither explicitly expose them nor require user-defined values for them, such as the move actors. 
- **Explicitly parameterizable actors**: Actors, which expose one variable, the value of which needs to be set by the user in order for the actor to poduce a meaningful effect, such as conditional and loop structures. 

As opposed to Assembly actors, Blockly allows additional types of blocks having predefined structures and possibly multiple explicit parameters. While this provides custom block creators with more possibilities and creative flexibility, defining everything as a block can lead to complicated, non-intuitive constructs for very simple statements, like assignments. Blocks taking many parameters may also expand horizontally or vertically, thus taking up lots of space of the viewport for a relatively simple matter.

Assembly tries to standardize blocks in order to simplify their creation and use. 

### The Blackboard

The blackboard is a design pattern in computer programming, which assumes that several actors (called knowledge sources) use the same memory space to share data with each other. We use this concept to make it easier to create and use actors in Assembly. The blackboard in Assembly uses three Objects, called Robot, Params, and Vars. The Robot object contains the state of the robot, including the joint angles and the coordinates of the end effector. Users cannot modify this Object--it is read only. The Params object contains a list of parameters, which are used by the actors from the actor library. Users can modify parameter values but not their names or the structure of the Params object (i.e., users cannot, for example, add or delete parameters). Finally, the Vars object contains user-defined variables, which are important especially for conditionals, loops, and other kinds of programming structures. Also, variables can be used to parameterize tasks. 

The Params and vars objects can be edited by users using an embedded JSON editor. JSON (Javascript Object Notation) is a popular ASCII file format, which, over the past 15 ears or so, has proven to be versitile and easy to read both by humans and machines. JSON uses a dictionary structure, which basically associates a key (e.g., the name of a variable or parameter) to a value. For example, a simple JSON object may look as follow:

{
  "name": "Assembly",
  "isCool": true,
  "someNumber": 45
}

To enable users to easily edit the Params and Vars objects, Assembly embeds the JSON editor by Jos de Jong: https://jsoneditoronline.org/

Go ahead and visit that website to try out that JSON editor, which is also used by Assembly. If you can use it, you are already halfway through on your way to becoming a robot programmer!

To assign values to variables and parameters, Assembly provides so-called *Set* actors, which--when dragged and dropped to the workflow region--take a snapshot of the Params or Vars objects. If an Assembly actor needs a parameter or uses a variable, it will try to read it from the Params or Vars object, respectively. The documentation of each actors clearly states, which parameters are needed. So, when using an actor that needs a parameter or variable, you must first set the value of that parameter or variable, or create that variable in the Vars object using the JSON editor beforehand. Then place the *Set* Params or Vars actor before the actual actor you indend to use. The *Set* actor now contains a snapshot of the Vars or Params object. When executing the workflow, the code generator will use that snapshot to set the value of the actual Vars or Params object, which are then used by the subsequent actors. 

This simple mechanism might not be as intuitive for beginners as Blockly variables and parameters. But once you understand the concept of a global variable, it will become easy to parameterize actors and to use variables. 

There are several advantages to this approach. First, actor creators do not have to think about complex actor structures, which can fit all the variables and parameters needed without using lots of space. And second, with relatively little effort, unexperienced programmers can master variable assignments in a textual mode, which represents the first step towards becoming a real programmer. And third, more experienced users can fit in entire Javascript expressions into variables and parameters, which are evaluated at runtime. 

### Tasks

A workflow can be saved as a task, which can be reused within other workflows. Tasks are an easy way to organize robot programs. In Assembly, tasks are simply stored in the browser's bookmarks bar and can be loaded by clicking on that bookmark. Task collections can be organized in folders and exported using the browser's bookmarks management features. Tasks can also be easily shared on web sites and dragged by users onto their browser's bookmarks bar. 

### The Simulator

### The Robot

### Supporting Functions

## Architecture

## Exit Strategy

...
