var winston = require('winston');
var moment = require('moment');



var dateFormat=function() {
	return moment().format('YYYY-MM-DD HH:mm:ss:SSS');
};

// winston.remove(winston.transports.Console);
// winston.add(winston.transports.Console, {'timestamp':function(){
//     return dateFormat();
// },'colorize':true}); 
//winston.info("test");

var date = new Date();
var file_name = date.getFullYear() + '_' + (date.getMonth() + 1) + '_' +date.getDate();

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({'timestamp': function(){
        return dateFormat(); 
        }}),
        new (winston.transports.File)({ 
            filename: 'logs/'+ file_name +'.log',
            timestamp:dateFormat,
            colorize:true,
            maxsize:1024*1024*10
        })
    ]
});


var crashLogger= new (winston.Logger)({
	transports: [
      	new (winston.transports.File)({
	      name: 'error',
	      filename: '/logs/crash.log',
	      level: 'error',
	      handleExceptions: true,
  		  timestamp:dateFormat,
  		  humanReadableUnhandledException: true,
  		  json: false,
  		  colorize:true,
          maxsize:1024*1024*10      		
	    })
    ]
});


//use
//logger.log('info', 'Hello distributed log files!');
// logger.info('Hello again distributed logs');
module.exports = logger;