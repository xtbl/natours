const { query } = require('express');
const Tour = require('./../models/tourModel');

// const fs = require('fs');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


// exports.checkID = (req, res, next, val) => {
//     const id = parseInt(req.params.id, 10);
//     const tour = tours.find(tourItem => tourItem.id === id);
//     if (!tour) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         });
//     }
//     next();
// };


exports.getAllTours = async (req, res) => {
    console.log(req.query);
    try {

        //BUILD QUERY

        // creates a copy of query
        const queryObj = {...req.query};
        // we don't want these fields to be included in the filtering
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(field => delete queryObj[field]);

        const query = Tour.find(queryObj);

        // EXECUTE QUERY
        const allTours = await query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: allTours.length,
            requestedOn: req.requestTime,
            data: {
                tours: allTours
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error
        });
    }


    // res.status(200).json({
    //     status: 'success',
    //     results: tours.length,
    //     data: {
    //         tours
    //     }
    // })
};

exports.getTour = async (req, res) => {
    try {
        // console.log(req);
        // console.log(params);
        const tourId = req.params.id;
        const tour = await Tour.findById(tourId);

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error
        });
    }
};

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'error',
            data: {
                message: err
            }
        })
    }
};

exports.updateTour = async (req, res) => {
    try {
        const tourId = req.params.id;
        const tour = await Tour.findByIdAndUpdate(tourId, req.body, {new: true, runValidators: true});

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'error',
            data: {
                message: err
            }
        })
    }
};

exports.deleteTour = async (req, res) => {
    try {
        const tourId = req.params.id;
        const tour = await Tour.findByIdAndDelete(tourId);

        res.status(204).json({
            status: 'success'
        })
    } catch (error) {
        res.status(404).json({
            status: 'error',
            data: {
                message: err
            }
        })
    }

};