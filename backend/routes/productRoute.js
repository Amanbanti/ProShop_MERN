import express from "express";
import {getProducts ,getProductById, createProduct,updateProduct} from '../controllers/productController.js'
import { protect,admin} from '../middleware/authMiddleware.js'
const router = express.Router();


router.get('/',getProducts);
router.get('/:id',getProductById);
router.post('/',protect,admin,createProduct);
router.put('/:id',protect,admin,updateProduct);
export default router;