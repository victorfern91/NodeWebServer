# NodeWebServer
### WebServer based in NodeJS without npm dependencies.

During a normal work day I'm always using a web server and sometimes I need run multiple web servers in different directories and ports.

As I don't like to install and configure apache in my machine, I've created this tiny web server in order to be simple to call it from command line and be the simpler as possible integrate it in bash/batch scripts, etc.

```bash
node webserver.js -p 80 -d ./htdocs
```

`-p` is the port where web server will run and `-d` is the path where web server will get the files.

or just type `-f`  to use a configuration file.

```bash
node webserver.js -f ./config.json
```

Configuration file example:
``` json
{
    "port": "8080",
	"directory": "./htdocs",
	"verboseMode": "true",
	"cors": "true"
}
```

Additional features:

* `--enable_cors` - should be used in order to avoid cross origin errors in the web browser.
e.g:
```
node webserver.js -p 80 -d ./htdocs --enable_cors
```
* `--verbose`- to get more information about user requests, like IP address and the requested file.
e.g:
```
node webserver.js -f config.json --verbose
```

Did you like it? Did you use it? Send me a message to victorfern91@gmail.com
