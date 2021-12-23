const express = require('express');
const router = express.Router();
const { getCourses,
		getCourse,
		createCourse,
		updateCourse,
		deleteCourse } = require('../controllers/course'); 
// middlewares
const { isAuth } = require("../middlewares/auth");

router.get('/',getCourses);

route.post('/create',createCourse);

router.route('/:id')
	.get(getCourse)
	.put(updateCourse)
	.delete(deleteCourse)