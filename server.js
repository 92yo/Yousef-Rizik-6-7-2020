const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require('path');
const cors = require("cors");

require("dotenv").config();

const mailRoutes = require("./routes/mail");
const authRoutes = require("./routes/auth");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

  // Heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// MongoDB
mongoose.connect(process.env.DB_URI, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB Connected");
  }
},
{ useUnifiedTopology: true, useNewUrlParser: true });

// Routes
app.use("/api/mail", mailRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server has started at ${PORT}`);
});
