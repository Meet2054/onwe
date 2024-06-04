import mongoose from 'mongoose';
import express from 'express';
import User from './db/user.js';

const app = express();
const port = 3000;

app.use(express.json());



mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

mongoose

app.get('/', (req, res) => {
  res.send('Server I Healthy!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
