require('dotenv').config()
const express = require('express'); //Line 1
const path = require('path')
const mongoose = require("mongoose"); // new
const cors = require("cors");
const ImageUploadRouter = require("./route/uploadImageRoute");

const port = process.env.PORT || 8000; //Line 3
const app = express(); //Line 2
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 1

const options = {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   };
   const app = express();
   app.use(express.json())// req.body
   app.use((req, res, next) => {
       res.locals.data = {}
       next()
   })
   app.use(cors());
   app.use(express.static(path.join(__dirname, 'build')))
   //adding the middlewares
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   
   
   app.use("/api", ImageUploadRouter);
   // Connect to MongoDB database
   // mongoose.connect(process.env.MONGO_URI, options);
   // const db = mongoose.connection;
   // db.on('connected', function () {
   //   console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
   // // });
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'build', 'index.html'))
   })
   mongoose
   .connect(process.env.MONGO_URI, options)
   .then(()=> {
     app.listen(8000,()=> {
       console.log("Starting server")
     })
   })