const router = require('express').Router();

const { Op } = require('sequelize');
// ---------------------- Import Models ----------------------
const Admin = require('../models/admin');


// Default Route
router.get('/', async (req, res) => {
    res.send('Default Route!');
});

// Create and Save API
exports.create = (req, res) => {

    // Validation Request
    if (!req.body.name) {
        res.status(400).send({
            message: "Name Cannot be empty"
        })
    }
    // create new user
    const AdminUser = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }

    // Save Admin in Database
    Admin.create(AdminUser).then(data => {
        res.send(data);
    }).catch((error) => {
        req.status(500).send({
            message: error.message || "Some Thing Went Wrong"
        });
    });


};

// Retrieve All
exports.findAll = (req, res) => {
    const name = req.query.name;
    const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Admin.findAll({ where: condition }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some Thing Error To Find All User"
            })
        })
}
// Fid a Single user
exports.findOne = (req, res) => {
    const id = req.params.id;

    Admin.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Admin with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Admin with id=" + id
            });
        });
}

// Update a user
exports.update = (req, res) => {
    const id = req.params.id;

    Admin.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Admin was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Admin with id=${id}. Maybe Admin was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
}

// Delete a user
exports.delete = (req, res) => {
    const id = req.params.id;

    Admin.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Admin was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Admin with id=${id}. Maybe Admin was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Admin with id=" + id
            });
        });
};

// Delete all user
exports.deleteAll = (req, res) => {
    Admin.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Admin were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Admin."
            });
        });
};

// Find all user
exports.findAllPublished = (req, res) => {
    Admin.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Admin."
            });
        });
};
