/*jslint node: true, vars: true, plusplus: true*/
'use strict';
var httpServer = require("http"),
    path = require("path"),
    url = require("url"),
    fileReader = require("fs"),
    debugMode = false,
    contentTypes = {
        '.txt': 'text/plain',
        '.html': 'text/html',
        '.css': "text/css",
        '.js': 'application/javascript',
        '.png': 'image/png',
        //font types Content Type
        '.woff': 'font/woff',
        '.ttf': 'font/ttf',
        '.eot': 'font/eot'
    },
    serverConfig = {
        'port': '81',
        'path': '..\\htdocs'
    },
    headers = {};

var webServer = function () {
    httpServer.createServer(function (req, res) {
        var request = url.parse(req.url).pathname;
        var fullPath = path.join(serverConfig.path, request);

        if (request === '/') {
            request += 'index.html';
        }

        fileReader.readFile(fullPath, "binary", function (err, file) {
            if (err) {
                res.writeHeader(500, {
                    "Content-Type": "text/plain"
                });
                res.write(err + "\n");
                res.end();
            } else {
                var contentType = contentTypes[path.extname(fullPath)];
                headers['Content-Type'] = contentType;
                res.writeHead(200, headers); // HTTP "OK" Response
                res.write(file, "binary");
                res.end();
            }
        });
        if (debugMode) {
            console.log("Remote connection from: " + req.connection.remoteAddress + " requesting file " + fullPath);
        }
    }).listen(serverConfig.port);
    console.log("Node Webserver running at port", serverConfig.port);
};

if (require.main === module) {
    var input = process.argv;
    var i, length, fileInfo;
    for (i = 2, length = input.length; i < length; i++) {
        if (input[i] === '-f') {
            fileInfo = fileReader.readFileSync(input[i + 1], 'utf8');
            serverConfig = JSON.parse(fileInfo);
        } else if (input[i] === '-p') {
            serverConfig.port = input[i + 1];
        } else if (input[i] === '-d') {
            serverConfig.path = input[i + 1];
        } else if (input[i] === '--debug') {
            debugMode = true;
        } else if (input[i] === '--enable_cors') {
            headers["Access-Control-Allow-Origin"] = "*";
            headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
            headers["Access-Control-Allow-Credentials"] = false;
            headers["Access-Control-Max-Age"] = '86400'; // 24 hours
            headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
        }
    }
    webServer();
}

//Catch Server Error
process.on('uncaughtException', function (err) {
    console.log('Was founded an error! Do you have any service running at port ' + serverConfig.port + '?');
    console.log('Node Webserver usage : node webserver.js -d <WebServer Directory> -p <Port> -debug');
    console.log('                  or   node webserver.js -f <Configuration File>');
    console.log(err);
});
