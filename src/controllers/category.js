const Category = require('../models/2-Category');

//@desc		Get all categories
//@route	GET /api/v1/categories
//@access	Public
exports.getCategories = async (req,res,next) => {
	try {
		const categories = await Category.findAll();
		res.status(200).json({
			success: true,
			data:  categories
		});
	}
	catch(error) {
		res.status(500).json({
			success: false,
			message : "server error"
		})
	}
}

//@desc		Get category by name
//@route	GET /api/v1/categories/:name
//@access	Public
exports.getCategory = async (req,res,next) => {
	try {
		const category = await Category.findOne({ where:{ name:req.params.name } });
		// in case there's no category with that name
		if(!category) {
			return res.status(404).json({
				success: false,
				message : "category not found"
			})
		}

		res.status(200).json({
			success: true,
			data: category,
		});	
	}
	catch(error) {
		res.status(500).json({
			success: false,
			message : "server error"
		})	
	}
}

//@desc		Create new category
//@route	POST /api/v1/categories/create
//@access	Private
exports.createCategory = async (req,res,next) => {
	try {
		// Name validation
		if(!req.body.name || req.body.name != String) {
			return res.status(401).json({
				success: false,
				message : "name is required and must be a string"
			});
		}

		// create category
		const category = await Category.create(req.body.name);

		res.status(200).json({
			success: true,
			message : "careated!",
			data: category
		});
	}
	catch(error) {
		res.status(500).json({
			success: false,
			message : "server error"
		})	
	}
}

//@desc		Update a category
//@route	PUT /api/v1/categories/:id
//@access	Private
exports.updateCategory = async (req,res,next) => {
	try {
		// check if the category exists or not
		const oldCategory = await Category.findByPk(req.params.id);
		if(!oldCategory) {
			return res.status(404).json({
				success: false,
				message : "category not found",
			})	
		}

		// Name validation
		if(!req.body.name || req.body.name != String) {
			return res.status(401).json({
				success: false,
				message : "name is required and must be a string"
			});
		}

		// Update category
		const updatedCategory = await oldCategory.update({ name:req.body.name });

		res.status(200).json({
			success: true,
			message : "updated",
			data: updatedCategory
		});
	}
	catch(error) {
		res.status(500).json({
			success: false,
			message : "server error"
		})	
	}
}

//@desc		Delete category from database
//@route	DELETE /api/v1/categories/:id
//@access	Private
exports.deleteCategory = async (req,res,next) => {
	try {
		// check if the category exists or not
		const category = await Category.findByPk(req.params.id);
		if(!category) {
			return res.status(404).json({
				success: false,
				message : "category not found",
			})	
		}

		// Delete category
		await category.delete();
		res.status(500).json({ success: true, message : "Deleted"})	

	}
	catch(error) {
		res.status(500).json({
			success: false,
			message : "server error"
		})	
	}
}