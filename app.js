const express = require('express') 
const jwt =  require('jsonwebtoken')
const serviceUser = require('./services/serviceUser');
const serviceRole = require('./services/serviceRole');
const { Sequelize } = require('sequelize');
const fs = require('fs')
const app = express()
const secret = fs.readFileSync('./params/secret.key')

var Model = require('./models/Model');
app.listen('5555', () => console.log('server listening on 5555 port...'))
buildModel();

// page d'accueil
app.get('/', async (req, res) => {
    res.json({message:' It works'})
})

//add role
app.post('/addRole', async (req, res) => {
    // recuperation
    let name = req.query.name;
    if('undefined' == name) {
        res.status(422).json({error:'parameters missing!'})
    }
    serviceRole.add(req, res);
 
})
//Roles
app.get('/roles', async (req, res) => {  
    console.log('exports.getAll Rest');
    await serviceRole.getAll(req, res);
})

//add user
app.post('/addUser', async (req, res) => {
    // recuperation
    let name = req.query.name;
    let firstName = req.query.firstName;
    let email = req.query.email;
    let password = req.query.password;
    if('undefined' == name || 'undefined' == firstName ||'undefined' == email ||'undefined' == password) {
        res.status(422).json({error:'parameter missing!'})
    }
    try{ 
        await serviceUser.add(req, res);
    }
    catch(err){
        res.status(501).json({err})

   }
})
//users
app.get('/users', async (req, res) => {  
    console.log('exports.getAll Rest');
    await serviceUser.getAll(req, res);
})
// login
app.post('/login', async (req, res) => {
    await serviceUser.authenticate(req, res);
})





function buildModel(){
    Model.sequelize.sync({logging: console.log});
}

module.exports = app;