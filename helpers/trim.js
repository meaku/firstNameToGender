"use strict";

function trim(string) {
    return string.replace(/^\s+/g,'').replace(/\s+$/g,'');
}

module.exports = trim;