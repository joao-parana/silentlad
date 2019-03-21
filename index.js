#!/usr/bin/env node
"use strict";

var inquirer = require("inquirer");
var chalk = require("chalk");

var response = chalk.bold.green;

var resume = require("./resume.json");

var resumePrompts = {
  type: "list",
  name: "resumeOptions",
  message: "What do you want to know about me?",
  choices: [...Object.keys(resume), "Exit"]
};

function main() {
  console.log("Hello,My name is SilentLad and welcome to my resume");
  resumeHandler();
}

function resumeHandler() {
  inquirer.prompt(resumePrompts).then(answer => {
    if (answer.resumeOptions == "Exit") {
      return;
    }
    var option = answer.resumeOptions;
    console.log(response("--------------------------------------"));
    resume[`${option}`].forEach(info => {
      console.log(response("|   => " + info));
    });
    console.log(response("--------------------------------------"));
    // console.log(resume[`${option}`]);
    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "Go back or Exit?",
        choices: ["DIR", "Go Back", "Exit"]
      })
      .then(choice => {
        // console.log("choice is:")
        // console.log(choice)
        if (choice.exitBack == "Go Back") {
          // console.log("resumeHandler invoke")
          resumeHandler();
        } else if (choice.exitBack == "DIR") {
          inquirer.registerPrompt('directory', require('inquirer-select-directory'));
          inquirer.prompt([{
            type: 'directory',
            name: 'from',
            message: 'Where you like to put this component?',
            basePath: './src'
          }]).then(function(answers) {
            // etc
            console.log(answers);
          });
        } else {
          return;
        }
      });
  });
}

main();


