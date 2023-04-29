//server.js
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log('Server Started on Port 3001');
});

app.get('/', (req, res) => {
  res.send('Testing 123');
});
const db = 'mongodb://localhost/react_image';
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB ...');
  })
  .catch(err => {
    console.error('Could not Connect to MongoDb !!!', err);
  });
  const Image = mongoose.model(
    'image',
    mongoose.Schema({
      imageUrl: String
    })
  );
  app.post('/upload', async (req, res) => {
    try {
      const newImage = new Image({
        imageUrl: req.body.imageUrl
      });
      await newImage.save();
      res.json(newImage.imageUrl);
    } catch (err) {
      console.error('Something went wrong', err);
    }
  });
  
  app.get('/getLatest', async (req, res) => {
    const getImage = await Image.findOne().sort({ _id: -1 });
    res.json(getImage.imageUrl);
  });
