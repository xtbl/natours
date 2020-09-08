const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


exports.checkID = (req, res, next, val) => {
    const id = parseInt(req.params.id, 10);
    const tour = tours.find(tourItem => tourItem.id === id);
    if(!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
};

exports.checkBody = (req, res, next) => {
    const { name, price } =  req.body;
    console.log('checkBody');
    console.log(name);
    console.log(price);
    if(!name || !price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Create Tour: Name and price required'
        });
    }
    next();
};

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        requestedOn: req.requestTime,
        data: {
            tours
        }
    })
};

exports.getTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
};

exports.createTour = (req, res) => {
    const tourIndex = tours.length - 1;
    const newId = tours[tourIndex].id + 1;
    console.log('create tour');
    console.log(req.body);
    console.log(newId);
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour>'
        }
    })
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
};