require('dotenv').config()
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors') 
const {TaskConnect} = require('./connections/TaskConection')
const TaskRouter = require('./routes/TaskRoute')
const notFound = require('./Middleware/notFound')
const errorHandle = require('./Middleware/errorHandle')
const AuthRouter = require('./routes/AuthRoute')

const port = process.env.PORT || 5000



//Middleware
app.use(express.json())
app.use(cors())

//Routes
app.use('/api/v1/tasks', TaskRouter)
app.use('/api/v1/auth', AuthRouter)

app.use(notFound)
app.use(errorHandle)


//Start
const start = async (url) => {
  await TaskConnect(url)
  app.listen(port,()=>{
      console.log(`Running On ${port}`)
  })
}

start(process.env.MONGO_URI)

