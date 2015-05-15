var Menu = require('./getMenu');
var Timer = require('./timer');
var Weather = require('./getWeather');
var irc = require('irc');

console.log("Bot starting...");
var botname = "Jausnator3000";
var ircServer = "irc.lut.fi";
var channel = '#botikkuna';
console.log(botname+" travelling to "+ircServer+"...");

var bot = new irc.Client(ircServer, botname, {
    autoConnect: false
});
bot.connect(5, function(input) {
  console.log("Connection established!");
  bot.join(channel, function(input) {
    console.log("Joined channel "+channel);
  });
});

bot.addListener('message', function(from, to, text) {
  readCommand(text);
});

Timer.atMidNight(function(){
  printNewsCast();
});

function readCommand(inp) {
  if(inp.toLowerCase()==="jasu mitä ruokaa") {
    printMenuToIRC();
  }
  if(inp.toLowerCase()==="jasu mikä sää") {
    printWeatherToIRC();
  }
  if(inp.toLowerCase()==="jasu help") {
    bot.say(channel, "'jasu mikä sää' for weather information.");
    bot.say(channel, "'jasu mitä ruokaa' for lunch information.");
  }
};

function printNewsCast() {
  bot.say(channel, "Beep.... Beep...");
  bot.say(channel, "Jausnator preparing to broadcast.");
  bot.say(channel, "...");
  printStatusToIRC();
}

function printMenuToIRC() {
  Menu.menuToday(function(result) {
    result.forEach(function(item) {
      bot.say(channel, item);
    });
  });
};

function printWeatherToIRC() {
  Weather.weatherToday(function(result) {
    result.forEach(function(item) {
      bot.say(channel, item);
    });
  });
};

function printStatusToIRC() {
  Weather.weatherToday(function(result) {
    result.forEach(function(item) {
      bot.say(channel, item);
    });
    bot.say(channel, "...");
    bot.say(channel, "Food service today:");
    Menu.menuToday(function(result) {
      var end = false;
      result.forEach(function(item) {
        bot.say(channel, item);
        if(item.indexOf("Chemicum") !== -1) {
          end = true;
        }
      });
      if(end === true) {
        bot.say(channel, "...");
        bot.say(channel, "Beep... Over...");
      }
    });
  });
};