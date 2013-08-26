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
