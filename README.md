ushine-learning-experiment
==========================

A nodejs web app, used to gather data on human response times with and without machine support.

This experiment was part of the [ushine-learning](https://github.com/dssg/ushine-learning) project built during the [Data Science for Social Good](http://www.dssg.io) fellowship in Summer 2013.

Thanks to [Mouse Tracker](link) project for the skeleton this was built upon.

##Installation

To run the app:

    $ node app.js

You can install any missing dependencies with:

    $ npm install -d

Modify line 25 in views/layout.jade to point to the correct IP of the server:

    var socket = io.connect('http://10.0.1.11:3000');

##Tips

- You can run `skipTutorial()` from inside the JavaScript console in order to skip the intro survey and/or the tutorial.
- There are three experiment modes. You can check the current one by typing `experimentMode` in the console.
    - 0 is unenhanced
    - 1 & 2 are enhanced
        - 1 is our machine-generated suggestions
        - 2 is perfect (gold-standard, hand-annotated) suggestions
- If you want to update the timer to jump to the end of the experiment, you can update the `count` variable in the console. A command like `count = 3` will set the counter to 3 seconds remaining.
- If you want to jump between the different UI screens, you can use the `updateExperimentStage()` function from console.
    - `updateExperimentStage('intro_survey')`
    - `updateExperimentStage('annotate_messages')`
    - `updateExperimentStage('exit_survey')`
