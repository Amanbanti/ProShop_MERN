
import asyncHandler from "../middleware/asyncHandler.js";
import Product from '../models/productModel.js';

export const getProducts = asyncHandler(async (req, res) => {
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;
  
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
  
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
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



//update a products
//private/admin
//Put /api/products/:id
export const updateProduct = asyncHandler (async (req, res) =>{
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    }= req.body

    const product = await Product.findById(req.params.id)
    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category =  category;
        product.countInStock =countInStock;


        const updateProduct =await product.save();
        res.json(updateProduct);


    }else{
        res.status(404);
        throw new Error('Resource not found!');
    }
});


// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});



// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});


