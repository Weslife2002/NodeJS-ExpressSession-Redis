const express = require('express');
const session = require('express-session');
const Redis = require('ioredis'); 
const RedisStore = require("connect-redis")(session)
const clientRedis = new Redis();


const app = express();
const PORT = process.env.PORT ||8081;

// app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    store: new RedisStore({client: clientRedis}),
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 10000,
    }
}))

app.get('/get-session', (req, res)=>{
    res.send(req.session)
})

app.get('/set-session', (req, res)=>{
    req.session.user = {
        username : "Hips Javascript",
        age: 38,
        email: "anonystick@gmail.com"
    }
    res.send('Set OK!')
})

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT} `);
})