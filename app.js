'use strict'
const app = require('express')()
const bp = require("body-parser").json({limit: '1mb'})
const articleRoutes= require('./routes/articleRoutes')
if(process.env.NODE_ENV=='development' || 'stagging'){
  const morgan= require('morgan')
  app.use(morgan('tiny'))
}

const port = process.env.PORT || 4009

app.use(function (req, res, next) {
  const token = req.headers["authorization"]
  console.log(token)
   if(!token) return res.status(401).json('unauthorized')
   if(token!='xyz') return res.status(401).json('unauthorized')
   next();
})
require('./startup/secure')
app.use(bp)
articleRoutes(app);
app.listen(port,()=>console.log(`Listening Port ${port}`))


