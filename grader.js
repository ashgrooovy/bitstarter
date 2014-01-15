#!/usr/bin/node
var program = require('commander');
var cheerio = require('cheerio');
var fs=require('fs');

var display = function(input){
    console.log("input="+input);
};

//Fn to read the HTML file
var cheerioHtmlFile=function(htmlfile){
    return cheerio.load(fs.readFileSync(htmlfile));
}

//Fn to read the JSON file
var loadChecks=function(checksfile){
    return JSON.parse(fs.readFileSync(checksfile));
}

var checkHtmlFile=function(htmlfile,checksfile){
    $=cheerioHtmlFile(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks){
	var present =$(checks[ii]).length > 0;
	out[checks[ii]]=present;
    }
    return out;
}

if(require.main==module){
    program
	.option('-c, --checks <check_file>','path to checks.json')
        .option('-f, --file <html_file>','path to index.html')
        .parse(process.argv)
    var checkJSON = checkHtmlFile(program.file, program.checks);
    var outJSON = JSON.stringify(checkJSON,null,4);
    console.log(outJSON);
}else{
    exports.checkHtmlFile=checkHtmlFile;
}