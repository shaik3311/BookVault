const express = require('express');
const {register,login, refresh, getInfo} = require('../controllers/authControllers')

const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/login', login);
authRouter.post('/refresh', refresh);
authRouter.get('/getInfo', getInfo);

module.exports = authRouter;