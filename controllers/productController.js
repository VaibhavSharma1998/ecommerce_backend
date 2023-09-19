// The controllers folder contains functions that handle
//  the business logic for various routes and endpoints.

// These functions interact with the models to perform
// CRUD operations and data manipulation

const Product = require("../Models/productModel");
const cloudinary = require("cloudinary").v2;

// create the product --admin(post)

exports.createProducts = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      product,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
// get all products (get)

exports.getAllProducts = async (req, res) => {
  // const role = req.query.role
  // {role:role}
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "success",
      result: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};

// update the product --admin(put)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "Sucees",
      product,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

// delete the product --Admin(delete)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Sucess",

      message: "id is suceesfully delete😜",
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

// get only one product

exports.getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: "Sucess",
      product,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

// get mens product

exports.getMenProducts = async (req, res) => {
  // const role = req.query.men
  try {
    const products = await Product.find({ role: "men" });
    res.status(200).json({
      status: "success",
      result:products.length,
      products,
    });
  } catch (err) {
    console.log(err);
    res.json(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

// get women products

exports.getWomenProducts = async(req,res) =>{
  try{
    const products = await Product.find({role:"women"});
    res.status(200).json({
      status:'Success',
      result:products.length,
      products
    })
  }catch(err){
    res.status(500).json({
      status:'Failed',
      message:err.message
    })
  }
}

// send image to cloudinary

exports.sendImg = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      folder: "products",
    });

    // now save the url to mongodb
    const newProduct = new Product({
      imageUrl: result.secure_url,
    });
    await newProduct.save();
    res.status(200).json({
      status: "Sucesss",
      message: "Image sucessfully saved to cloudinary",
    });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({
        status: "failed",
        message: "An error occured while saving image to cloudinary",
      });
  }
};
