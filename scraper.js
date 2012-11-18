"use strict";

var request = require('request'),
    fs = require("fs"),
    jsdom = require('jsdom'),
    trim = require("./helpers/trim.js");

function scrapeNames() {

    var names = {};

    function addNames(namesList) {

        var currentName = "",
            currentGender = "";

        namesList.split(",").forEach(function(name) {

            if(name === null || name === undefined) {
                name = "";
            }

            if(name.indexOf("♀") !== -1 && name.indexOf("♂") !== -1) {
                currentName = name.substr(0, name.length-3);
                currentGender = "mf";
            }
            else if(name.indexOf("♀") !== -1 && name.indexOf("♂") === -1) {
                currentName = name.substr(0, name.length-2);
                currentGender = "f";
            }
            else if(name.indexOf("♀") === -1 && name.indexOf("♂") !== -1) {
                currentName = name.substr(0, name.length-2);
                currentGender = "m";
            }

            names[trim(currentName)] = currentGender;
        });
    }

    //TODO set a proper user-agent in order not to get blocked by wikipedia
    //http://de.wikipedia.org/wiki/Liste_von_Vornamen
    var htmlContent = fs.readFileSync("./data/vornamen-wikipedia.html", "utf-8");

    jsdom.env({
        html: htmlContent,
        scripts: ["http://code.jquery.com/jquery.js"],
        done: function (errors, window) {

            var $ = window.$,
                ps = $('#mw-content-text p');

            //the first one is nosense
            delete ps[0];

            ps.each(function(idx, item){
                addNames($(item).text());
            });

            fs.writeFileSync("./data/names.json", JSON.stringify(names), "utf-8");
        }
    });
}

module.exports = scrapeNames;






