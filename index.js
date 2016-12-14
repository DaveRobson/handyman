#! /usr/bin/env node

const chalk = require('chalk');

const cli = require('yargs');
const loader = require('./src/pluginLoader');
let context = {};
context.root = __dirname;

loader.register(cli, context);

console.log('\n' + chalk.underline.green('Handyman'));

cli
    .usage('hm <cmd> [args]')
    .demand(1, "must provide a valid command")
    .argv