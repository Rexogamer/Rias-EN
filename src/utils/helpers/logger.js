'use strict';

const chalk = require('chalk');

function resolveNum(num) {
    if (!isNaN(num)) {
      return (num > 10 ? num : `0${num}`);
    } else {
      return num;
    }
}

module.exports = class Logger {
  constructor(client) { this.client = client; }

  warn(text) {
    let date = new Date();
    if (!text) { return console.log(`[${chalk.keyword("green")(resolveNum(date.getDate())+"/"+resolveNum(date.getMonth()+1)+"/"+date.getFullYear())}] [${chalk.keyword("orange")("Warn")}] Vous devez inclure un texte pour afficher un warn`); }
      return console.log(`[${chalk.keyword("green")(resolveNum(date.getDate())+"/"+resolveNum(date.getMonth()+1)+"/"+date.getFullYear())}] [${chalk.keyword("orange")("Warn")}] ${text}`);
  }

  log(text) {    
    let date = new Date();
    if (!text) { return console.log(`[${chalk.keyword("green")(resolveNum(date.getDate())+"/"+resolveNum(date.getMonth()+1)+"/"+date.getFullYear())}] [${chalk.keyword("orange")("Warn")}] Vous devez inclure un texte pour afficher un log`); }
      return console.log(`[${chalk.keyword("green")(resolveNum(date.getDate())+"/"+resolveNum(date.getMonth()+1)+"/"+date.getFullYear())}] [${chalk.keyword("magenta")("Info")}] ${text}`);
  }

  error(text) {    
    let date = new Date();
    if (!text) { return console.log(`[${chalk.keyword("green")(resolveNum(date.getDate())+"/"+resolveNum(date.getMonth()+1)+"/"+date.getFullYear())}] [${chalk.keyword("orange")("Warn")}] Vous devez inclure un texte pour afficher une erreur`); }
      return console.log(`[${chalk.keyword("green")(resolveNum(date.getDate())+"/"+resolveNum(date.getMonth()+1)+"/"+date.getFullYear())}] [${chalk.keyword("red")("Error")}] ${text}`);
  }
};