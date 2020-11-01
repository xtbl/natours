
const fs = require('fs');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

//READ JSON FILE

console.log(__dirname);
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));
// console.log(tours);
// const tours = fs.readFile('tours-simple.json', 'utf-8', (err, data) => {
//     if(err) {
//      console.log(err);
//      return;
//     }
//     console.log('DATA');
//     console.log(data);
// });


const importData = async() => {
    try {
        await Tour.create(tours);
        console.log('Data imported');
    } catch (error) {
        console.log(error);
    }
    process.exit();
}

const deleteData = async() => {
    try {
        await Tour.deleteMany();
        console.log('Data deleted!');
    } catch (error) {
        console.log(error);
    }
    process.exit();
}

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    console.log(con.connections);
    console.log('DB connection successful');
});

console.log(process.argv);


if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}

// const app = require('./app');
// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//     console.log(`App running on port ${port}`);
// });