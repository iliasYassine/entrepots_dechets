/// dans le model nous allons gerer toute la partie bdd 

var Sequelize = require('sequelize');
var sequelize = new Sequelize("entrepot_dechets", "root", "root", {
    dialect: "mysql",
    host: "localhost",
    logging: false //passer a true pour voir les différentes requêtes effectuées par l'ORM
});
//on exporte pour utiliser notre connexion depuis les autre fichiers.
var exports = module.exports = {};
exports.sequelize = sequelize;

/**
 * ROLE
 */
 const Role = sequelize.define('role', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: Sequelize.STRING(255), allowNull: false},
},
        {tableName: 'role', timestamps: false, underscored: true, logging: false}//par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique pour les dates de création et de modification (très pratique si nécessaire) et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId".
);
exports.Role = Role;

/*
 * USER
 */
const User = sequelize.define('user', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: Sequelize.STRING(255), allowNull: false, },
    firstname: {type: Sequelize.STRING(255), allowNull: false, },
    password: {type: Sequelize.STRING(255), allowNull: false, },
    email: {type: Sequelize.STRING(255), allowNull: false, unique: true},
},
        {tableName: 'user', timestamps: false, underscored: true, logging: false}
);
exports.User = User; 

User.belongsTo(Role);//l'utilisateur à un rôle.