(function() {
  var app, express, i, io, m_players;

  winston = require('winston');
  logger = new (winston.Logger)({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: '2012-08-15-user_eval_internal.log' })
    ]
    // exceptionHandlers: [
    //   new winston.transports.File({ filename: 'path/to/exceptions.log' })
    // ]
  });

  express = require('express');

  io = require('socket.io');
  

  app = module.exports = express.createServer();
  
  io = io.listen(app);

  io.set('log level', 1);

  app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    return app.use(express.static(__dirname + '/public'));
  });

  app.configure('development', function() {
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });

  app.configure('production', function() {
    return app.use(express.errorHandler());
  });

  app.get('/', function(req, res) {
    return res.render('index', {
      title: 'Node.JS Sockets',
      // layout:false,/
      // socket_id : socket.id,
    });
  });

  app.listen(3000);

  m_players = [];

  i = 0;

  io.sockets.on('connection', function(socket) {
    console.log("New connection: " + socket);
    socket.on('client_connected', function(data) {
      data.id = socket.id;
      m_players[i] = data;
      i++;
      return io.sockets.emit("send_data", m_players);
    });
    socket.on('update_coords', function(pos) {
      // var x, _ref;
      // try {
      //   for (x = 0, _ref = m_players.length; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
      //     if (m_players[x].id === socket.id) {
      //       m_players[x].x = pos.x;
      //       m_players[x].y = pos.y;
      //       console.log("Client: " + socket.id);
      //       console.log("X: " + pos.x + ",  Y: " + pos.y);
      //       break;
      //     }
      //   }
      // } catch (err) {
      //   console.log(err);
      // }
      // return io.sockets.emit("send_data", m_players);
    });

    // - pri0:
    //     - timing
    //         - start_message
    //         - end_message
    //         - start_task_<task_name> for [pii, location, url, categories]
    //         - end_task_<task_name>
    //     - results
    //         - complete_task_<task_name> for [pii, location, url, categories] and record user values
    // - pri1:
    //     - add_value_<task_name> , value
    //     - remove_value_<task_name> , value
    // - pri2:
    //     - mouse_movement    
    //     - keyboard_input

    socket.on('intro_survey', function(results) {
      var event = 'intro_survey';
      var client = socket.id;
      var meta = { 
        'client' : client, 
        'event' : event, 
        'results' : results
      };
      logger.log('info', '', meta);
    });

    socket.on('exit_survey', function(results) {
      var event = 'exit_survey';
      var client = socket.id;
      var meta = { 
        'client' : client, 
        'event' : event, 
        'results' : results
      };
      logger.log('info', '', meta);
    });

    socket.on('start_experiment', function(experimentMode) {
      var event = 'start_experiment';
      var client = socket.id;
      var meta = { 
        'client' : client, 
        'event' : event, 
        'experiment_mode' : experimentMode
      };
      logger.log('info', '', meta);
    });

    socket.on('end_experiment', function(reason) {
      var event = 'end_experiment';
      var client = socket.id;
      var meta = { 
        'client' : client, 
        'event' : event, 
        'reason' : reason
      };
      logger.log('info', '', meta);
    });

    socket.on('start_message', function(message_idx, message_id) {
      var event = 'start_message';
      var client = socket.id;
      var meta = { 
        'client' : client, 
        'event' : event, 
        'message_idx' : message_idx,
        'message_id' : message_id
      };
      logger.log('info', '', meta);
    });

    socket.on('start_task', function(message_idx, message_id, task_idx, task_name) {      
      var event = 'start_task';
      var client = socket.id;
      var meta = { 
        'client' : client, 
        'event' : event, 
        'message_idx' : message_idx,
        'message_id' : message_id,
        'task_idx' : task_idx, 
        'task_name' : task_name
      };
      logger.log('info', '', meta);
    });

    socket.on('end_message', function(message_idx, message_id, results) {
      var event = 'end_message';
      var client = socket.id;
      var meta = { 
        'client' : client, 
        'event' : event, 
        'message_idx' : message_idx,
        'message_id' : message_id,
        'results' : results 
      };
      logger.log('info', '', meta);
    });

    socket.on('window_blur', function(message_idx, message_id) {
      var event = 'window_blur';
      var client = socket.id;
      var meta = { 
        'client' : client, 
        'event' : event, 
        'message_idx' : message_idx, 
        'message_id' : message_id,
      };
      logger.log('info', '', meta);
    });

    socket.on('window_focus', function(message_idx, message_id) {
      var event = 'window_focus';
      var client = socket.id;
      var meta = { 
        'client' : client, 
        'event' : event, 
        'message_idx' : message_idx, 
        'message_id' : message_id,
      };
      logger.log('info', '', meta);
    });

    return socket.on('disconnect', function() {
      // TODO: query logs, convert to nice format?
      
      var j, n, tmp;
      j = 0;
      n = 0;
      tmp = [];
      while (n < m_players.length) {
        if (m_players[j].id === socket.id) {
          n++;
          break;
        }
        if (n < m_players.length) {
          tmp[j] = m_players[n];
          j++;
          n++;
          break;
        }
      }
      m_players = tmp;
      i = j;
      return io.sockets.emit('send_data', m_players);
    });
  });

}).call(this);
