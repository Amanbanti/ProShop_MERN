import express from 'express';
import product from './data/product.js'


const port =5000;
const app= express();

app.get('/' , (req,res) =>{
    res.send('API is Running...');
})



app.get('/api/product' , (req,res) =>{
    res.json(product);
})


app.get('/api/product/:id' , (req,res) =>{
    const p = product.find((p) => p._id === req.params.id);
    res.json(p);

});

app.listen(port, ()=> {
    console.log('Server running on port '+ port);
})