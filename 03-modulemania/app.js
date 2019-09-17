var express = require('express');
var app = express();
var square = require('./square');
var triangle = require('./triangle');



app.get('/area', function (req, res) {
    res.send(`${square.area(666)} is the area of a square with one side of 666`);
})

app.get('/perimeter', function (req, res) {
    res.send(`${square.perimeter(666)} is the perimeter of a square with one side of 666!`);
})

app.get('/triangle-area', function (req, res) {
    res.send(`${triangle.area(6, 66)} is the area of a triangle with base 6 and height 66`);
})

app.get('/triangle-perimeter', function (req, res) {
    res.send(`${triangle.perimeter(6,6,6)} is the perimeter of a triangle with each side of 6!`);
})




app.listen(666, function () {
    console.log('listening on port 666 🧟‍♂️')
})