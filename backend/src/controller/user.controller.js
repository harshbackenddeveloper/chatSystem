const db = require("../models");
const io = require("../../index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()


const user = async (req, res) => {
    res.sendFile("../public/index.html")
};


// User
const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const checkemail = await db.User.findOne({ where: { email: email } });
        if (checkemail) {
            res.status(400).json({ msg: 'Email has already registered' });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(password, salt);

            const data = await db.User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashpassword
            });
            res.status(200).json({ msg: 'Registered successfully', response: data });
        }



    } catch (error) {
        res.status(400).json({ msg: 'Error in registering', response: error })
    }

};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //match email
        const user = await db.User.findOne({ where: { email: email } });
        if (!user) {
            res.status(400).json({ msg: 'Email not found' });
        }
        //match password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24hrs' });

        res.status(200).json({ msg: ' Successfully Login ', response: user, token: token });

    } catch (error) {
        res.status(400).json({ msg: 'Bad request', response: error })
    }

};

const updateSocketId = async (req, res) => {
    try {
        const { userid, socket } = req.body;
        //check User has socket id or not
        const checkUser = await db.User.findOne({ where: { socket_id: socket } });
        const data = await db.User.update({ socket_id: socket }, { where: { id: userid } });
        res.status(200).json({ msg: 'socket id updated', response: data });
        // if (checkUser) {
        //     res.status(400).json({ msg: 'socket id already assigned' });
        // } else {
        //update the socket id

        // }

    } catch (error) {
        res.status(400).json({ msg: 'Error in updating the socket id', error: error });
    }
};


const getuserdetails = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await db.User.findOne({ where: { id: id } });
        res.status(200).json({ msg: 'Successfully fetched the data', response: data });
    } catch (error) {
        res.status(400).json({ msg: 'Error in getting the users data', error: error });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const data = await db.User.findAll({
            where:
            {
                socket_id: {
                    [db.Sequelize.Op.not]: null
                }
            }
        });
        res.status(200).json({ msg: 'Successfully fetched the data', response: data });
    } catch (error) {
        res.status(400).json({ msg: 'Error in getting the users data', error: error });
    }
};


const getUser = async (socketId) => {
    try {
        const data = await db.User.findOne({ where: { socket_id: socketId } });
        return data;
    } catch (error) {
        return error
    }
};

module.exports = {
    user,
    register,
    login,
    updateSocketId,
    getuserdetails,
    getAllUsers,
    getUser
}