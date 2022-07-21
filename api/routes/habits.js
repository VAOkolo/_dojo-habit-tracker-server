const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits')

router.get('/', habitsController.index)
router.get('/:email', habitsController.showEmail)
router.get('/:id', habitsController.showHabit)
router.post('/', habitsController.create)
router.delete('/:id', habitsController.destroy)
router.put('/:id', habitsController.update)

module.exports = router;
