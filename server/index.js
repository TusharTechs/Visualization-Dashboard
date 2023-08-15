const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnect = require('./db/dbConnect');
const data = require('./routes/dataRoute');

const PORT = 5000;

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

app.use('/api', data);

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
    dbConnect();
  });