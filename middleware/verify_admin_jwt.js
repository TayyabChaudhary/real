const jwt = require('jsonwebtoken');
const Role = require('../helpers/roles');


// Users HardCoded For Simplicity Store In a Database 
const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
];

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({
            sub: user.id, role: user.role
        }, process.env.JWT_SECRET);
        const { password, ...userWithoutPassword } = user;

        return {
            ...userWithoutPassword,
            token
        };
    }
}

// Get All User REST API
async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}


// Get By Id User
async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) {
        return;
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}


module.exports = {
    authenticate,
    getAll,
    getById
}












