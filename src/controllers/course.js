const courseServices = require('../services/course.services');

//@desc		Get all the courses
//@route	GET /api/v1/courses
//@access	Public
exports.getCourses = async (req,res,next) => {
	try {
		const courses = await courseServices.findAllCourses();
		return res.status(200).json({ success:true, data: courses });
	}
	catch(error) {
		res.status(500).json({ success: false , message: "Server error" });
	}
};


//@desc		Get one course by id
//@route	GET /api/v1/courses/:id
//@access	Public
exports.getCourse = async (req,res,next) => {
	try {
		const course = await courseServices.findCourse(req.params.id);
		return res.status(200).json({ success:true, data: course });
	}
	catch(error) {
		res.status(500).json({ success: false , message: "Server error" });
	}
};

//@desc		Create new course
//@route	POST /api/v1/courses/create
//@access	Private/Teacher/Admin
exports.createCourse = async (req,res,next) => {
	try {
		const createdCourse = await courseServices.create(req.body);
		return res.status(201).json({ success:true, data: createdCourse });
	}
	catch(error) {
		res.status(500).json({ success: false , message: "Server error" });

	}
};

//@desc		Update a specific course
//@route	UT /api/v1/courses/:id
//@access	Private/Teacher/Admin
exports.updateCourse = async (req,res,next) => {
	try {
		const updatedCourse = await courseServices.update(req.body);
		return res.status(201).json({ success:true, data: updatedCourse });	
	}
	catch(error) {
		res.status(500).json({ success: false , message: "Server error" });

	}
};

//@desc		Delete a course
//@route	DELETE /api/v1/courses/:id
//@access	Private/Teacher/Admin
exports.deleteCourse = async (req,res,next) => {
	try {
		const course = await courseServices.delete(req.prams.id);
		return res.status(201).json({ success:true, message: "deleted!" });
	}
	catch(error) {
		res.status(500).json({ success: false , message: "Server error" });

	}
};