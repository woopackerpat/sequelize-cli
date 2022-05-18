require('dotenv').config()
require('./config/passport')
console.log(process.env)

const express = require("express");
const app = express();
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const todoRoute = require('./routes/todoRoute')
const errorMiddleware = require('./middlewares/error')
const notFoundMiddleware = require('./middlewares/notfound');
const authenticate = require("./middlewares/authenticate");
const passportJwt = require('./middlewares/passportJwt')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// REST API: handle resource Todos
// CREATE, UPDATE, DELETE, GETALL, GETBYID
app.use('/todos', passportJwt,todoRoute)

// REST API: handle resource Users
// CREATE, UPDATE
app.use('/users', userRoute)

app.use(notFoundMiddleware)
app.use(errorMiddleware)


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server run on port ${port}`));
