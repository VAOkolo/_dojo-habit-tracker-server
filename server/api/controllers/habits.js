const express = require('express')
const router = express.Router()

const Habit = require('../models/habits')

//getting all user habit data
router.get('/', async (req, res) => {
    try {
        console.log("TESTING")
        const habits = await Habit.all;
        res.status(200).json(habits)
    } catch (err) {
        res.status(500).json({err})
    }
})

//getting all users (users) habit data
router.get('/:email', async (req, res) => {
    try {
        const habits = await Habit.findByEmail(req.params.email)
        res.json(habits)
    } catch(err) {
        res.status(500).json({err})
    }
})

//getting specific habit
router.get('/:email/:id', async (req, res) => {
    try {
        const habitList = await Habit.findByHabit(req.params.id, req.params.email)
        res.json({habitList})
    } catch(err) {
        console.log(err)
        res.status(500).json({err})
    }
})

//posting new habit
router.post('/', async (req, res) => {
    try {
        const habit = Habit.create(req.body.content, req.body.email)
        res.json(habit)
    } catch (err) {
        res.status(404).json({err})
    }
})

//updating users new habit


module.exports = router;
