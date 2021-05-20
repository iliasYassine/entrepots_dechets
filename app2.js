const express = require('express')
const User = require ('./models/User.js')
const fs = require ('fs')
const jwt = require('jsonwebtoken')

let  secret  = fs.readFileSync('./params/secret.key')
const app = new express()
const db = require("./models/index.js");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

app.listen('5555', () => console.log('server running on port 5555...'))

// Page d'accueil
app.get('/', (req, res) => {

    res.json({
        message: 'it works!'
    })
})

// ajout de l'utilsateur
app.post('/addUser', (req, res) => {

    // get  user info from request
    //  eventuels controle
    let name = req.query.name;
    let firstName = req.query.firstName;
    let email = req.query.email;
    let password = req.query.password;
    let user = new User(name, firstName, email, password);
     // TODO : ajout du champ droit
    // TODO : tester si l'user est en BD

    // Si c'est le cas en revoie le flux json
    res.json({
        message: "L'utilisateur " + name + " " 
        +firstName +" existe dèja"    })
    // s'il existe pas ==> il faut l'ajouter en base
})

// Authentification d'un l'utilsateur
app.post('/login', (req, res) => {
    // get email et password
    let email = req.query.email;
    let password = req.query.password;
    let name , firstName ="";
    if(undefined ==email || undefined ==password) 
    res.json({
        message: "Email ou Login missed ... " })

    // checker en base si on a l'association email, password
    // si ce n'est pas le cas ==> renvoyer un message 'login ou  mot de passe incorrect
    // si c'est le cas ==> generer le token et le renvoyer 
    let user = new User(name, firstName, email, password);
    jwt.sign({user}, secret, (err, token) =>  { 
        if(err){
            res.status(501).json({message :"erreur à la generation du token"});
        }
        // renvoie du token
        res.status(200).json({token});
    })
})


module.exports = app