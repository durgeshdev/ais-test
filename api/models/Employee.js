'use strict';

const mongoose = require('mongoose');

let tableSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    dob: {
        type: Date
    }
}, {
    timestamps: true
});

mongoose.model('Employee', tableSchema);
