const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

const jokesRoute = require('./routes/jokes');
const app = express();

dotenv.config({
    path: './config/config.env'
});

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Connected to mongodb`)
}).catch(error => {
    console.log(`Error: ${error.message}`);
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/v1/jokes', jokesRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server connected in ${process.env.NODE_ENV} on port ${PORT}`)
})