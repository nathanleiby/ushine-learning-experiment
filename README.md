Ushine Learning: User Experiment
==========================

A nodejs web app, used to gather data on human performance with and without machine support. 

We seek to measure the impact of machine suggestions on human performance (speed, accuracy, frustration). The "machine-suggested" answers in `messages.json` were generated using the [Ushine Learning `machine` class](https://github.com/dssg/ushine-learning/tree/master/dssg).

This experiment is part of the [Ushine Learning](https://github.com/dssg/ushine-learning) project built during the [Data Science for Social Good](http://www.dssg.io) fellowship in Summer 2013.

## Installation

Clone the repo.

You can install any missing dependencies with:

```
$ npm install -d
```

Modify `views/layout.jade` to point to the correct IP of the server:

```
var socket = io.connect('http://10.0.1.11:3000');
```

To run the app:

```
$ node app.js
```

## Tips

There are many commands you can run from inside the JavaScript console to jump around and debug.

- `startMessageAnnotation()` - Skip the intro survey and go to the tutorial.
- `skipTutorial()` - Skip the tutorial and begin at the first "real" message (this calls `startMessageAnnotation()` behind the scenes, but also skips the tutorial message).
- `experimentMode` - Tells you the version of the experiment you're running. There are three experiment modes:
    - 0 is unenhanced
    - 1 & 2 are enhanced
        - 1 is our machine-generated suggestions
        - 2 is perfect (gold-standard, hand-annotated) suggestions
- `count = <int>` - If you want to update the timer to jump to the end of the experiment, or give you more time, you can update the `count` variable in the console. A command like `count = 3` will set the counter to 3 seconds remaining.
- `updateExperimentStage()` - Jump to different stage (with a different user interface) of the experiment.
    - `updateExperimentStage('intro_survey')`
    - `updateExperimentStage('annotate_messages')`
    - `updateExperimentStage('exit_survey')`

## Future Plans

### Re-run experiment with improved machine

To run this experiment again in the future, it would be possible to either:

1. Update the `messages.json` file to have new machine suggestions. Verify that new suggestions

2. Based on user feedback from our study, it might be worthwhile to modify the node app. One reason we didn't do this immediately is that we didn't expect so many users to take our experiment, so we sought to keep a consistent testing environment. If the experiment itself is changed, then the numbers produced in this first experiment will no longer be directly comparable.
    1. Unify all user input to mouse-clicks on works. Click-and-drag is painful.
    2. Remove highlight URL as a task. Machines should be perfect at extracting these. We only measured this task so we had a baseline to understand how much time users spent on this before.
    
### Add timing hooks into Ushahidi

As another important measurement, we'd also like to record real-world timing data. This means adding timing hooks to the Ushahidi platform itself.

## Thanks

Thanks to [Mouse Tracker](https://github.com/bscarvell/Mouse-Tracker) project for the skeleton this was built upon.
