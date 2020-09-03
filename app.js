const express = require('express');
const morgan = require('morgan');
const { restart } = require('nodemon');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

const port = 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});