const express = require('express');
const diary = require('../controllers/diary.controller');

const router = express.Router();
//Diary
router.route('/:name').get(diary.findAll).post(diary.create).delete(diary.deleteAll);

router.route('/:name/:id').get(diary.findOne).put(diary.update).delete(diary.delete);

module.exports=router;