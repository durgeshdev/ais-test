const mongoose = require('mongoose');

const EmployeeModel = mongoose.model('Employee');


module.exports = {
    getAllEmployee, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee
}

function getAllEmployee(req, res) {
    let count = req.query.limit ? Number(req.query.limit) : 10;
    let page = req.query.page ? Number(req.query.page) : 1;
    let skip = count * (page - 1);
    let conditions = {};

    EmployeeModel.find(conditions, null, {})
    .skip(skip)
    .limit(count)
    .exec(function(err, rslt){
        if (err) {
            res.json({
                code: 400,
                message: 'Internal server err'
            })
        } else {
            res.json({
                code: 200,
                data: rslt
            })
        }
    })
}

function getEmployeeById(req, res){
    let id = req.params.id;
    EmployeeModel.findOne({_id: id}, function(err, result){
        if (err) {
            res.json({
                code: 400,
                message: 'Internal server err'
            })
        } else {
            if (result) {
                res.json({
                    code: 200,
                    data: result
                }) 
            } else {
                res.json({
                    code: 400,
                    message: 'Employee record not found'
                })
            }
            
        }
    })
}

function createEmployee(req, res) {
    let inputData = req.body;

    let record = new EmployeeModel(inputData);
    record.save(function(err, result){
        if (err) {
            res.json({
                code: 400,
                message: 'Internal server err'
            })
        } else {
            res.json({
                code: 200,
                message: 'Employee registered successfully'
            })
        }
    })
}

function updateEmployee(req, res) {
    let id = req.params.id;
    let data = req.body;
    let conditions = {
        _id: id
    }
    EmployeeModel.findByIdAndUpdate(conditions, data, function(err, result){
        if (err) {
            res.json({
                code: 400,
                message: 'Internal server err'
            })
        } else{
            if(!result){
                res.json({
                    code: 400,
                    message: 'Employee record not found'
                })
            } else {
                res.json({
                    code: 200,
                    message: 'Employee updated successfully'
                })
            }
        }
    })
}


function deleteEmployee(req, res){
    let id = req.params.id;
    EmployeeModel.findByIdAndRemove({_id: id}, function(err, result){
        if (err) {
            res.json({
                code: 400,
                message: 'Internal server err'
            })
        } else {
            if (result) {
                res.json({
                    code: 200,
                    message: 'Employee deleted successfully'
                }) 
            } else {
                res.json({
                    code: 400,
                    message: 'Employee record not found'
                })
            }
            
        }
    })
}