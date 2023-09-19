// The routes folder holds route definitions.

// Each route file defines the routes and associates them with controller functions.

// These routes determine the API endpoints and HTTP methods.



const express = require('express');

const productController = require('../controllers/productController.js')

const {isAuthenticatedUser} = require('../middleware/auth.js')

const router = express.Router()

const upload = require('../middleware/upload.js')



// express.Router() is a method provided by 
// Express.js that creates a new router instance (example).


router.route("/products").get(productController.getAllProducts)

router.route("/product/new").post(isAuthenticatedUser,productController.createProducts)

router.route("/product/:id").put(isAuthenticatedUser,productController.updateProduct).delete(productController.deleteProduct).get(isAuthenticatedUser,productController.getOneProduct)

// router.route('/upload').post(upload.single('image'),productController.sendImg)

router.route("/products/men").get(productController.getMenProducts)
router.route("/products/women").get(productController.getWomenProducts)
// Your routes
router.route('/upload').post(upload.single('image'), productController.sendImg);
module.exports = router