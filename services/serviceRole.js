const Model = require('../models/Model');

exports.getById = async (req, res, next) => {
    const { id } = req.params;

    try {
        let role = await Model.Role.findById(id);

        if (role) {
            return res.status(200).json(role);
        }

        return res.status(404).json('role_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}
exports.getAll = async (req, res, next) => {
    console.log('exports.getAll');
    try {
        let roles = await Model.Role.findAll();
        console.log('exports.getAll calling');
        return res.status(201).json(roles);
    } catch (error) {
        return res.status(501).json(error);
    }
}
exports.add = async (req, res, next) => {
    const temp = {};

    ({ 
        name: temp.name
    } = req.query);
    console.log (temp.name+ '    ==> temp.name');
    Object.keys(temp).forEach((key) => (temp[key] == null) && delete temp[key]);

    try {
        let role = await Model.Role.create(temp);

        return res.status(201).json(role);
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.update = async (req, res, next) => {
    const temp = {};

    ({ 
        name     : temp.name,
        id: temp.id
    } = req.query);

    try {
        let role = await Model.Role.findOne({ email: temp.email });

        if (role) {       
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    role[key] = temp[key];
                }
            });
            
            await role.save();
            return res.status(201).json(role);
        }

        return res.status(404).json('role_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const { id } = req.body;

    try {
        await Model.Role.deleteOne({ _id: id });

        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}