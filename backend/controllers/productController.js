
import asyncHandler from "../middleware/asyncHandler.js";
import Product from '../models/productModel.js';


export const getProducts = asyncHandler (async (req, res) =>{
    const products = await Product.find({}); // Fetch all user products
    res.json(products);

});

export const getProductById = asyncHandler (async (req, res) =>{
    const product = await Product.findById(req.params.id);
    if(product){
        return  res.json(product);
    }else{
        res.status(404);
        throw new Error('Resource not found!');
    }

})


//create a products
//private/admin
//POST /api/products

export const createProduct = asyncHandler (async (req, res) =>{
   const product = new Product({
        name :'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category :'Sample Category',
        countInStock:0,
        numReviews:0,
        description:'Sample description',
   })
   const createdProduct = await product.save();
   res.status(201).json(createdProduct);
});


