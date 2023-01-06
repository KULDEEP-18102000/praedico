const express = require("express");
const router = express.Router();
var fetchuser = require("../middlewares/fetchuser");
const User = require('../models/User');
// const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Get all users
router.get('/getallusers', async (req, res) => {
    try {
        const data = await User.find({})
        res.send(data)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})

//Get user by ID
router.get('/getuserbyid/:id', async (req, res) => {
    try {
        const id = req.params.id;

        User.findById(id)
            .then(data => {
                if (!data)
                    res.status(404).send({ message: "Not found user with id " + id });
                else res.send(data);
            })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})

//update user by ID
router.put('/updateuserbyid/:id', async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    try {
        // userId=req.user.id;
        // const user=await User.findById(userId).select("-password")
        // res.send(user)
        const id = req.params.id;
  
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update user with id=${id}. Maybe user was not found!`
          });
        } else res.send({ message: "user was updated successfully." });
      })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: "Error updating user with id=" + id});
    }
})

//delete user by id
router.delete('/deleteuserbyid/:id', async (req, res) => {
    try {
        // userId=req.user.id;
        // const user=await User.findById(userId).select("-password")
        // res.send(user)
        const id = req.params.id;
  
    User.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`
          });
        } else {
          res.send({
            message: "user was deleted successfully!"
          });
        }
      })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Could not delete user with id=" + id);
    }
})

//delete all users
router.delete('/deleteallusers', async (req, res) => {
    try {
        User.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Users were deleted successfully!`
        });
      })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:
            err.message || "Some error occurred while removing all users."});
    }
})

//find all approved users
router.get('/findallapproved', async (req, res) => {
    try {
        User.find({ approval: true })
        .then(data => {
          res.send(data);
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:
            err.message || "Some error occurred while retrieving users."});
    }
})

module.exports = router