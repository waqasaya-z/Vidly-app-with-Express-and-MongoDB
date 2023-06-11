const express = require('express');
const app = express();
const genres = require('./routes/genre');
const mongoose = require('mongoose');
const customers = require('./routes/customers');

app.use(express.json());
app.use('/api/genre',genres);
app.use('/api/customers', customers)

mongoose.connect('mongodb://127.0.0.1:27017/vidly')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Error Connecting',err))

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('Server is running on port 3000')
})