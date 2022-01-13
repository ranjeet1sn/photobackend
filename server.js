const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/auth.route');
const photoRoutes = require('./routes/photo.route');
require('dotenv').config();
require('./connection/connection');
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  })
);
app.use('/api/auth', userRoutes);
app.use('/api/photo', photoRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
