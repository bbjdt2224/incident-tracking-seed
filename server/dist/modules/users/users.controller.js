"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require('/../../database/models/index');
class UsersController {
    signup(req, res) {
        db.users.create({
            email: req.body.email
        });
    }
    login(req, res) {
        db.users.findOne({
            where: {
                email: req.body.email
            }
        }).then(function (user) {
        });
    }
    logout(req, res) {
    }
    editUser(req, res, id) {
        db.users.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role
        }, {
            where: {
                id: req.params['id']
            }
        });
    }
}
exports.UsersController = UsersController;
