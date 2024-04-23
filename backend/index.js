const express = require('express');
const path = require('path');
const Sequelize = require("sequelize");
const app = express();
const { Server } = require('socket.io');
const http = require('http').Server(app);
require("./src/config/config.json");
const bodyParser = require('body-parser');
require('dotenv');
const cors = require('cors');
const userRouter = require("./src/routes/user.route");
const { getmessage, addUser, getMatches, getUser } = require('./src/controller/user.controller');
app.use(express.static(path.resolve('./src/public')));

const io = new Server(http, { cors: { origin: "*", } });

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//connect to db 
const sequelize = new Sequelize({
    username: 'root',
    password: 'root@123',
    database: 'chatdb',
    host: 'localhost',
    dialect: 'mysql',
});
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });


app.use("/", userRouter);


io.on('connection', (socket) => {
    console.log('A user connected', socket.id);


    socket.on('user_message', async (data) => {
        console.log(1452, data);
        const dataObj = {
            message: data.message,
            type: 'incoming'
        }
        const getUsers = await getUser(data.socketId);

        io.to(getUsers.socket_id).emit('botMessage', dataObj);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected')
    });

});


const port = process.env.PORT || 8000;
http.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

