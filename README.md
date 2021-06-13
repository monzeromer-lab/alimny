# Alimny Online
> Open source Online Education system API

A ready to use system allows you to make your mission easier to teach online class , train and manage your team

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)
* [Owners](#build-by)

## General info
Free Open source API for education systems built by the power of JavaScript and Node,js 


## Technologies
* Express js
* Socket io
* MySQL 

## Setup
1. install npm modules with `npm install` command 

2. change `/config/key.json` to `/config/keys.json`
 
3. add your database connection ( host , user , database , password) and your token secret key in `/config/keys.json`

## Keys Examples

    {
    "database" : {
    "host" : "example.org",
    "user" : "bob",
    "password" : "secret",
    "database" : "my_db"
    },
    "TokenSecret" : "",
    "port" : 2022,
    "host" : "localhost"
    }

## Features
List of features ready and TODOs for future development:
* Online class (live – Recorded).
* Real Time Chats between (school team) , (students – teacher) , (students in a specific Lecture)
* Timeline (allow all the user to post an article or a just a small post contains text and media like pictures or videos or both)
* Schedule a class
* Real time questions in the live lecture (also allow the teacher to pin a question in the video)

To-do list:
* We'll start the project over again and remove the current version for better project structure and security improvements. 

## Status
Project is: _in progress_

## Inspiration
 Project inspired by [Code_sudan](https://codesudan.io/) and [Discord](https://discord.com/)

## Contact
[@monzersmiledev](https://twitter.com/monzersmiledev/)
[Email](monzersmiledev@outlook.com)
[WhatsApp](https://wa.me/249121601505)

## Build By
[Monzer Omer](https://github.com/monzersmiledev) , [Saddam Arbaa](https://github.com/saddamarbaa) and [Mohammed Gadeen](https://github.com/Gadeenz)

please feel free to contact and contribute with us!
