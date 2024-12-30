const express = require('express');
const { getHomepage, 
    getCategory, postCategory, deleteCategory, updateCategory, 
    getProducts, postProduct, deleteProduct, updateProduct, 
    getSubCategory, postSubCategory, deleteSubcategory, updateSubcategory,
    getReport } = require('../controller/homeController');

const router = express.Router();

router.get('/', getHomepage)

router.get('/category', getCategory);
router.post('/category', postCategory)
router.post('/category/delete/:ProductCategoryID', deleteCategory)
router.post('/category/update/:ProductCategoryID', updateCategory)

router.get('/product', getProducts)
router.post('/product', postProduct)
router.post('/product/delete/:ProductID', deleteProduct)
router.post('/product/update/:ProductID', updateProduct)

router.get('/subcategory', getSubCategory)
router.post('/subcategory', postSubCategory)
router.post('/subcategory/delete/:ProductSubcategoryID', deleteSubcategory)
router.post('/subcategory/update/:ProductSubcategoryID', updateSubcategory)

module.exports = router;