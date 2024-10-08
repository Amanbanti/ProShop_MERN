
import asyncHandler from "../middleware/asyncHandler.js";
import Product from '../models/productModel.js';


export const getProducts = asyncHandler (async (req, res) =>{
    const products = await Product.find({}); // Fetch all users
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

