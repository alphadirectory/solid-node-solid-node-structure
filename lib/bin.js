#!/usr/bin/env node
"use strict";

const directory = require('./structure');
try {
    console.info("@FILES CREATED", directory.loadFiles());
} catch (e) {
    console.error(e.message);
}