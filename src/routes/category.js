const express = require('express');
const router = express.Router();
const { getCategories,
		getCategory, 
		createCategory,
		updateCategory,
		deleteCategory } = require('../controllers/category');
// middlewares
const { isAuth } = require("../middlewares/auth");

router.get('/',getCategories);

router.get('/:name',getCategory);

router.post('/create',createCategory);

router.put('/',updateCategory);

router.delete('/',deleteCategory);

module.exports =  router