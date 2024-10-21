
import asyncHandler from "../middleware/asyncHandler.js";
import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler (async (req, res) =>{
   const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,

   }=req.body;

   if(orderItems && orderItems.length=== 0){
    res.status(400);
    throw new Error('No order items!')
   }else{
    const order = new Order({
        orderItems: orderItems.map((x) => ({
            ...x,
            product:x._id ,
            _id:undefined
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    })
    const createOrder = await order.save();
    res.status(201).json( createOrder )



   }

});



// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private

export const getMyOrders = asyncHandler (async (req, res) =>{
    //req.user is setted in midleware in orderroute
    const orders = await  Order.find({user:req.user._id})
    res.status(200).json(orders);
 });


// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler (async (req, res) =>{
    const order  = await  Order.findById(req.params.id).populate(
        'user', 'name email'
    )
    if(order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Error('Order Not found!')
    }
   
 
 });




// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
 export const updateOrderToPaid= asyncHandler (async (req, res) =>{
   const order = await Order.findById(req.params.id);

   if (order){
    order.isPaid = true;
    order.paidAt= Date.now();
    order.paymentResult =  {
        id : req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address:req.body.payer.email_address
    }

    const updateOrder = await order.save();

    res.status(200).json(updateOrder   )
   }else{
    res.status(404);
    throw new Error('Order Not found!')
   }
 
 });



// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
 export const updateOrderToDelivered= asyncHandler (async (req, res) =>{
    res.send('updateOrderToDelivered');
 
 });





 
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
 export const getOrders = asyncHandler (async (req, res) =>{
    res.send('getOrders');
 
 });