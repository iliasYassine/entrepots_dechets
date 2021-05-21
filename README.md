# entrepots_dechets
A l'issue d'un entretien je dois réaliser un projet en express js via node js.

# Proof of Concept : MySQL / Node.js CRUD REST API
 

Ce mini-projet est un PoC présentant quelques requêtes en API REST (GET et POST) sur une base de données structurées, composée de 4 dossiers et un fichier main : 
1.  config : gérer la config de la base de données en dure.
2. services : nous avons deux services : serviceRole qui prend en compte le rôle de l’utilisateur et renvoi un code statuts. Et nous avons serviceUser qui gère le crud , l’authentification ,  
3. models : implémentation de l’orm pour mysql. Il permet de faire les relations et trasfert de donné de manière rapide et solide entre les objet créer et la base de donnée.
4. params : Il permet de créer un code secret dans un fichier .key par mesure de sécurité lors du token.
5. le Main : point d’entrée du projet


### Prérequis

Ce projet requiert d'avoir une extraction des données entrepôt sous forme d'un fichier Excel/CSV ou qu'ils soient déjà intégrer dans une base de données MySQL. 
1. Pour un test en local :

### Installation

Les étapes pour installer votre programme :
Télécharger mysql 
Télécharger node js 
Une fois installé faire les commande suivante sur git bash à l’emplacement du dossier ou nous allons implémenter. 
$ npm install express --save
$ npm install express



## Démarrage
Lancé la commande sur gitbash : nodemon app
## Technologies
* [Materialize.css](http://materializecss.com) - Framework CSS (front-end)
* Node.js - _v14.17.0_
* NPM - _v6.14.13_
* Express.js - (Framework Web BackEnd de Node.js)
* 
* MySQL 8 
* Editeur de code : [VS Code](https://code.visualstudio.com/)
* Client BDD : mysql
* Client API REST : Postman


## Versions

**Dernière version stable :** 1.0
**Dernière version :** 1.1
Liste des versions : [Cliquer pour afficher](https://github.com/your/project-name/tags)

## Auteurs
* **ilias HASBI** _alias_ [@iliasHASBI](https://github.com/ilias_hasbi)
Lien github du projet : https://github.com/iliasYassine/entrepots_dechets.git
