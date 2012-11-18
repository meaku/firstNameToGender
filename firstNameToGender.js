"use strict";

var names = require("./data/names.json");

function firstNameToGender(firstName) {
    return names[firstName];
}

module.exports = firstNameToGender;