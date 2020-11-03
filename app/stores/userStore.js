
var userService = require("../services/userService.js");


export const addUser = (data, cb) => {
    userService.addUser(data).then(function(res) {
        cb(res);
    });
}

export const listUser = (data, cb) => {
    userService.listUser(data).then(function(res) {
        cb(res);
    });
}

export const getUser = (data, cb) => {
    userService.getUser(data).then(function(res) {
        cb(res);
    });
}

export const getAllUser = (data, cb) => {
    userService.getAllUser(data).then(function(res) {
        cb(res);
    });
}

export const addContact = (data, cb) => {
    userService.addContact(data).then(function(res) {
        cb(res);
    });
}
export const listFullContact = (data, cb) => {
    userService.listFullContact(data).then(function(res) {
        cb(res);
    });
}




export const crudUser = (data, cb) => {
    switch (data.ops) {
        case "add":
            addUser(data, cb);
            break;
        case "update":
            editUser(data, cb);
            break;
    }
}