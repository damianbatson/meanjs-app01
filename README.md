[![MEAN.JS Logo](http://meanjs.org/img/logo-small.png)](http://meanjs.org/)

[![Build Status](https://travis-ci.org/meanjs/mean.svg?branch=master)](https://travis-ci.org/meanjs/mean)
[![Dependencies Status](https://david-dm.org/meanjs/mean.svg)](https://david-dm.org/meanjs/mean)

MEAN.JS is a full-stack JavaScript open-source solution, which provides a solid starting point for [MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/) based applications. The idea is to solve the common issues with connecting those frameworks, build a robust framework to support daily development needs, and help developers use better practices while working with popular JavaScript components. 

MEAN.js experiment for uploading JSON files.

utilises danialfarid’s super awesome angular-file-upload module to upload files and multer on the express side.

view modules/articles/client/controller/articles.client.controller.js which sends the multi-part form data from the view template to the routing.

view modules/articles/server/controller/articles.server.controller.js which writes the JSON data to the folder location and generates a unique filename.
