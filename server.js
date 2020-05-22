const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

//BodyParser middleware
app.use(bodyParser.json());

//db config
//keys to mongoose URI ada di config
mongoose.connect(require('./config/keys').mongoURI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .catch(err => console.log("Connection Err"));
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

//Route middleware to API
const items = require('./routes/api/items');

app.use('/api/items',items);

// static asset in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//heroku & dev
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Started on Port ${port}`));