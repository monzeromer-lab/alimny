const User = require('../../../models/1-User');
const Category = require('../../../models/2-Category');
const Course = require('../../../models/3-Course');
const courseServices = require('../../../services/course.services');
const database = require('../../../db/database');
const data = {
	name: "master vue",
	slug: "master-vue",
	image: "ma.jpg",
	description: "a course will giude you to advanc",
	price: 10.00,
	userId: 1,
	categoryId:1,
};

beforeAll(async () => {
	await database.sync();
});

beforeEach(async () => {
	await User.destroy({where:{}});
	await Category.destroy({where:{}});
	await Course.destroy({where:{}});
	await User.bulkCreate([
		{
			id:"1",
			username: 'ahmed',
			email:'ahmed@mail.com',
			password: 'password',
		},
		{
			id:"2",
			username: 'momen',
			email:'momen@mail.com',
			password: 'password',
		},
	]);
	await Category.bulkCreate([
		{id: 1 ,name : "programming"},
		{id: 2, name : "design"},
	]);
	await Course.bulkCreate([
		{
			id:1,
			name: "master react",
			slug: "master-react",
			image: "master.jpg",
			description: "a guide to learn react",
			price: 20.00,
			categoryId: 2,
		},
		{
			id:2,
			name: "master Node",
			slug: "master-Node",
			image: "masternode.jpg",
			description: "a guide to learn Node",
			price: 50.00,
			categoryId: 1,
		},
	]);
});

describe("Course services unit testing",  () => {

	it("Should return all the courses", async () => {
		const courses = await courseServices.findAllCourses();
		expect(courses).toEqual(expect.any(Array));
		expect(courses.length).toEqual(2);
	});

	it("Should get a course by it's id" , async () => {
		const course = await courseServices.findCourse(1);
		expect(course.name).toBe("master react");
	});

	it("Should return false when the course is not found" , async () => {
		const course = await courseServices.findCourse(5);
		expect(course).toBe(false);
	});

	it("Should create a new course", async () => {
		const createdCourse = await courseServices.create(data);
		expect(createdCourse.name).toBe("master vue")
		expect(createdCourse.categoryId).toBe(1)
		expect(createdCourse.userId).toBe(1)
	});

	it("Should update a course", async () => {
		data.name = "Master laravel";
		data.categoryId = 2;
		data.price = 300.00;
		const updatedCourse = await courseServices.update(1,data);
		expect(updatedCourse.name).toBe("Master laravel");
		expect(updatedCourse.slug).toBe("master-react");
		expect(updatedCourse.categoryId).toBe(2);
		expect(updatedCourse.price).toBe(300.00);
	});

	it("Should returns a false when the course we try to update not found", async () => {
		const updatedCourse = await courseServices.update(90,data);
		expect(updatedCourse).toBe(false);
	});

	it("Should delete a course by id ", async () => {
		const course = await courseServices.delete(1);
		expect(course).toBe(true);
	});

});