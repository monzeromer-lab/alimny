const Course = require('../models/3-Course');

module.exports = class CourseServices {

	// Find all courses
	static async findAllCourses() {
		try {
			const courses = await Course.findAll();
			return courses;
		}
		catch(error){
			return false;
		}
	}

	// Find one course by id
	static async findCourse(courseId) {
		try {
			const course = await Course.findByPk(courseId);
			if(!course) {
				throw new Error("Not found")
			}
			return course;
		}
		catch(error){
			return false;
		}
	}

	// Create new course
	static async create(data) {
		try {
			const newCourse = await Course.create(data);
			return newCourse;
		}catch(error){
			return false;
		}
	}

	// Update Course
	static async update(courseId,data) {
		try {
			const oldCourse = await this.findCourse(courseId);
			const updatedCourse = await oldCourse.update({
				name: data.name || oldCourse.name,
				image: data.image || oldCourse.image,
				description: data.description || oldCourse.description,
				price: data.price || oldCourse.price,
				categoryId: data.categoryId || oldCourse.categoryId
			});
			return updatedCourse;
		}catch(error){
			return false;
		}
	}

	// Delete course from database
	static async delete(courseId) {
		try {
			const course = await this.findCourse(courseId);
			await course.destroy();
			return true;
		}catch(error){		
			return false;
		}
	}

}