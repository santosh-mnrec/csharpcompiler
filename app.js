var express = require('express');
var fs = require('fs');
var url = require('url');
var bodyParser = require("body-parser");
var app = express();
var exec = require('child_process').exec;
function compile(filename, res) {
    var command='C:\\Windows\\Microsoft.NET\\Framework\\v3.5\\csc.exe /t:exe /out:Temp.exe ' + filename;
    console.log(command);
    exec(command, function (error, stdout, stderr) {

        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
        if (error !== null) {
            console.log('exec error: ', error);
        }
        else {
            exec("MyApplication.exe", function (err, out, stde) {
                res.end(out);
            });

        }
    });
}
app.use(express.static(__dirname + '/public'));
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.get("/", function (req, res) {
    res.sendFile("Index.html");
});
app.post('/receive', urlencodedParser, function (req, res) {
    console.log("post");
    var filePath = __dirname+"\\Hello.cs";
    console.log(req.body.komutdosyasi);
    fs.writeFile(filePath,req.body.code , function(err) {
    if(err) {
        res.end(err.toString());
        
    }

    compile(filePath,res);
}); 


});

app.listen(3000);
    