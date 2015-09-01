/*
 * Test HTTP Server
 */
var fs = require ("fs");
var http = require ("http");
var path = require ("path");
var url = require ("url");

var server = null;

/**
 * Create test HTTP server to serve JSON content.
 * @param {int} port Port number for server.
 */
function createTestServer (port) {
    server = http.createServer (function (request, response) {
        // some common content types
        var contentTypes = [
            { "fileType":"json", "text":"application/json" },
        ];

        // build path to file
        var uri = url.parse (request.url).pathname;
        var filename = path.join (path.dirname (fs.realpathSync (__filename)), uri);

        // if file does not exist, return 404
        if (fs.existsSync (filename) === false) {
            console.log ("Not found " + filename);
            response.writeHead (404, { "Content-Type": "text/plain" });
            response.write ("404 Not Found");
            response.end ();
        } else {
            try {
                var data = fs.readFileSync (filename, "binary");

                var contentType = "text/plain";
                var index = filename.lastIndexOf (".");
                if (index > -1) {
                    var fileType = filename.substr (index + 1);
                    for (var ctr = 0; ctr < contentTypes.length; ctr ++) {
                        if (fileType === contentTypes[ctr].fileType) {
                            contentType = contentTypes[ctr].text;
                            break;
                        }
                    }
                }

                response.writeHead (200, { "Content-Type": contentType });
                response.write (data, "binary");
                response.end ();
            } catch (e) {
                response.writeHead (500, { "Content-Type": "text/plain" });
                response.write ("500 Server Error");
                response.end ();
            }
        }
    }).listen (port);
}
    
/**
 * Close test HTTP server.
 */
function closeTestServer () {
    server.close ();
}

//exports
exports.createTestServer = createTestServer;
exports.closeTestServer = closeTestServer;
