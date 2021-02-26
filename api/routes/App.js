const express = require("express");

const {getAllEmployee, createEmployee, updateEmployee, deleteEmployee} = require("../controllers/employee");

const router = express.Router();


//employee
router.get("/employee", getAllEmployee);
router.post("/employee",  createEmployee);
router.patch("/employee/:id", updateEmployee);
router.delete("/employee/:id", deleteEmployee);

module.exports = router;
