const express = require("express");
const app = express();
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const todoRoute = require('./routes/todoRoute')
const errorMiddleware = require('./middlewares/error')
const notFoundMiddleware = require('./middlewares/notfound')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// REST API: handle resource Todos
// CREATE, UPDATE, DELETE, GETALL, GETBYID
app.use('/todos', todoRoute)

// REST API: handle resource Users
// CREATE, UPDATE
app.use('/users', userRoute)

app.use(notFoundMiddleware)
app.use(errorMiddleware)


const port = 8000;
app.listen(port, () => console.log(`Server run on port ${port}`));
