# a s s e m ⛆ b l y
An open source, web-based robot programming environment for Google Chrome.

Tudor B. Ionescu
Vienna Technical University

[![DOI](https://zenodo.org/badge/250469792.svg)](https://zenodo.org/badge/latestdoi/250469792)

## Online Version

You can use Assembly at: https://assembly.comemak.at

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

A workflow consisting of a series of actors linked together can be saved as a task. Tasks can be reused within other tasks. Thus, tasks are an easy way to organize robot programs. In Assembly, tasks are simply stored in the browser's bookmarks bar and can be loaded by clicking on that bookmark, with the Assembly web page open in the current browser tab. Task collections can be organized in folders and exported using the browser's bookmarks management features.  

When saving a task, snapshots of the Params and Vars objects are saved as well. When loading a task, the content of the global Params and Vars objects is overwritten by the content of the saved snapshots. 

When loading a saved task, it will also be placed as a task actor in the Actor and Task Library region. To use saved tasks within other tasks they former need to be loaded first, one by one. As a best practice, you can save an empty task and load that one last. Then, you can use the other tasks you loaded within the new, empty task. Before loading a task that uses other tasks, the latter need to be loaded first. So, in a sense, tasks are both analogous to procedures and libraries in other programming languages. Assembly will tell users about which tasks they need to load first when trying to load a task that uses other tasks. 

The idea behind tasks is threefold. First, they allow you to organizie and save robot programs directly within the browser. Second, they allow you to reuse tasks in other tasks using a programming concept called aggregation. And third, tasks can be shared with other users by exporting them as browser bookmarks. 

### The Simulator

Assembly uses an adapted version of the Glumb 6 DOF (degrees of freedom) robot simulator by Maximilian Beck (http://robot.glumb.de/). The simulator is embedded in the right hand side of the Assembly environment. It can be controlled either using the text boxes in the upper left side of the page or using the mouse. In the latter case, the ALT key needs to be kept pressed while dragging the robot with the left mouse button pressed. Click on the robot's tool center point (TCP) to drag it around. Since this robot does not have an attached tool, the TCP is represented by the final segment, from where the red-green-blue Carthesian coordinate arrows originate. Dragging the robot without pressing the ALT tab will rotate the entire scene so that you can get a better perspective on the robot's position in 3D space.

The exact position of the robot's TCP is updated in the controls area and the Robot object in the blackboard. The Robot object also contains the axis angles corresponding to a certain TCP pose (i.e., Carthesian X,Y,Z position plus orientation expressed as Euler rotation angles around the respective axes: RX, RY, RZ). 

A snapshot of the current robot pose, including the viewing perspective is stored as a thumbnail as part of the "move to" actor. When used in a workflow, this actor will move the robot to that pose. This way, different poses can be stored by first dragging the robot to the desired position and then dragging a "move to" actor to the workflow. This corresponds to a teach in procedure, which is a common way of programming robot behaviors.

Besides making it easy to teach robot moves, the simulator can also be used to learn some things about direct and inverse kinematics -- the bread and the butter of robotics. The robot has some built in axes limitations, which will turn the respective axes red if those limits are exceeded. So try to teach poses that don't break those limits; otherwise a real robot might not be able to reach that pose.

Please note that the robot moves and poses in this simulator will not correspond exactly to the moves of a real robot. This simulator is only there to help you sketch a robot program without using an actual physical robot. When testing a program created using the simulator with a real robot, please stand at a safe distance and observe carefully how the robot moves and whether those moves are what you expected. Also, from safety reasons, Assembly limits the robot speed and does not allow you to change it in the simulator. 

Simulations are a rough approximation of reality. Moreover, they are a construction of reality, which may be different for anyone and any program. So use the simulator primarily to learn how to program robots. Always test each move with a real robot at low speed and while keeping a safety distance. 

### The Robot

Assembly can be used both for offline and online robot programming. In the first case, you can run programms in the embedded simulator. In the second case, programs will be generated and sent to a web service, which provides low-level robot handling functions. Currently, Universal Robots (https://www.universal-robots.com/) are supported.

To connect to the robot, just enable the swith on the left side of the simulator controls. When the robot is connected, you will no longer be able to control it in the simulation (e.g., by dragging the TCP) or using the simulator controls. The simulator reflects the current pose of the physical robot. The robot's pose can be changed using the robot own human-machine interface (HMI) or manually using, for example, the freedrive mode in URs Polyscope HMI. All the other actors will work just like in the simulator--except for the actors, which control the robot's end effector (e.g., gripper), which currently do not have an implementation in the simulation.

To recapitulate: When the robot checkbox is enabled, the physical robot controls the simulation. The other way around would increase the risk of injury. 

When pressing the play button in Assembly, the current task is sent to the robot and executed. So please keep a safe distance from the robot when doing so.

### Supporting Functions

## Architecture

## Exit Strategy

...
