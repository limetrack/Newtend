angular.module('node').factory('ContactsStore', function () {
    "use strict";

    return {
        contacts: [
            {
                name: "Vasya Pupkin",
                date: "10/10/1910",
                gender: "Male"
            },
            {
                name: "Ivan Ivanov",
                date: "11/11/1911",
                gender: "Male"
            },
            {
                name: "Sidor Sidorov",
                date: "12/12/1912",
                gender: "Male"
            },
            {
                name: "Petr Poroshenko",
                date: "26/09/1965",
                gender: "Male"
            },
            {
                name: "Barack Obama",
                date: "04/08/1961",
                gender: "Male"
            },
            {
                name: "Vladimir Putin",
                date: "07/10/1952",
                gender: "Male"
            },
            {
                name: "Mahatma Gandhi",
                date: "02/10/1869",
                gender: "Male"
            }
        ],
        newContact: {
            name: "",
            date: "",
            gender: "Gender"
        }

    };
});
