const express = require('express');
const app = express();
const config =  require('typescript-text-config');
const global = new config.TextConfig("config.txt");

const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static('public'));
app.use(morgan());
app.use(cors());
app.use(helmet());
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());

var Somme = mongoose.model('Somme', require('./shema'), 'somme');

app.get('/page',require('./page'));

app.get('/api', function (req, res) {
    res.status(200).json({
        status: "200",
        message: "server is working!!!"
    });
});

app.get('/api/cal', function(req, res) {
    if(req.query!={}) {
        const s = parseInt(req.query.a) + parseInt(req.query.b);
        Somme.collection.insert({ resulat: s  }, function (err, docs) {
            if (err){ 
                return console.error(err);
            } else {
                res.status(200).json({
                    status: "200",
                    message: s.toString()
                });
            }
        });
    }
    else {
        res.status(200).json({
            status: "200",
            message: "empty"
        });
    }
});

app.get('/api/find', function (req, res) {
    Somme.find({}, function (err, docs) {
        res.json(docs);
    });
});

app.get('/api/remove', function (req, res) {
   Somme.remove({}, function (err, docs) {
       res.json(docs);
   });
});


const http = require('http');

const server = http.createServer(app);

server.listen(parseInt(global.getItem('port')), () => {
    console.log("server is workin fine")
});
