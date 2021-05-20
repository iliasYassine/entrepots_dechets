const Model = require('../models/Model');
const jwt =  require('jsonwebtoken')
const fs = require('fs')
const secret = fs.readFileSync('./params/secret.key')
exports.getAll = async (req, res, next) => {
    console.log('exports.getAll');
    try {
        let users = await Model.User.findAll();
        console.log('exports.getAll calling');
        return res.status(201).json(users);
    } catch (error) {
        return res.status(501).json(error);
    }
}
exports.getById = async (req, res, next) => {
    const { id } = req.params;

    try {
        let user = await Model.User.findById(id);

        if (user) {
            return res.status(200).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.add = async (req, res, next) => {
    const temp = {};

    ({ 
        name     : temp.name,
        firstname: temp.firstname,
        email    : temp.email,
        password : temp.password,
        roleId : temp.roleId
    } = req.query);
    console.log (temp.firstname+ '    ==> temp.firstname');
    console.log (temp.email+ '    ==> temp.email');
    console.log (temp.password+ '    ==> temp.password');
    console.log (temp.name+ '    ==> temp.name');
    console.log (temp.roleId+ '    ==> temp.roleId');
    Object.keys(temp).forEach((key) => (temp[key] == null) && delete temp[key]);

    try {
        let user = await Model.User.create(temp);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.authenticate = async (req, res, next) => {
    try {
        console.log('req.query.email '+req.query.email);
        let user = await Model.User.findOne({ email: req.query.email });
        console.log('...user ==> '+user);
        if (user && user.password == req.query.password) {       
            jwt.sign({user}, secret, (err, token) =>  {
                if (err){
                    return res.status(501).json({message :"Problème rencontré à la generation du token"})
                } 
                return res.status(200).json({token})
             })
        }

        else return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.update = async (req, res, next) => {
    const temp = {};

    ({ 
        name     : temp.name,
        firstname: temp.firstname,
        email    : temp.email,
        password : temp.password
    } = req.body);

    try {
        let user = await Model.User.findOne({ email: temp.email });

        if (user) {       
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });
            
            await user.save();
            return res.status(201).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const { id } = req.body;

    try {
        await Model.User.deleteOne({ _id: id });

        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}