const router = require('express').Router();

const AdminHelpers = require('../helpers/admin_helpers');
const authorize = require('../helpers/authorize');
const Role = require('../helpers/roles');
const middlewaresAdmin = require('../middleware/verify_admin_jwt');

router.post('/admin', AdminHelpers.create);
router.get('/getadmin', AdminHelpers.findAll);
router.get("/published", AdminHelpers.findAllPublished);
// Retrieve a single Tutorial with id
router.get("/getadmin/:id", AdminHelpers.findOne);
// Update a Tutorial with id
router.put("/updateadmin/:id", AdminHelpers.update);
// Delete a Tutorial with id
router.delete("/deleteadmin/:id", AdminHelpers.delete);
// Delete all AdminHelpers
router.delete("/deleteall", AdminHelpers.deleteAll);


router.post('/authenticate', authorize);
router.get('/adminu', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);


function authenticate(req, res, next) {
    middlewaresAdmin.authenticate(req.body).then((result) => {
        result ? res.json(result) : res.status(400).json({ message: 'Username or password is incorrect' })
    }).catch((err) => {
        next(err);
    });
}

function getAll(req, res, next) {
    middlewaresAdmin.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    middlewaresAdmin.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}




module.exports = router;