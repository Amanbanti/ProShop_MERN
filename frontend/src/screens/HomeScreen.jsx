import React from 'react'
import { useEffect,useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios'
import Product from '../components/Product.jsx';
const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=> {
      const fetchProducts = async () =>{
        const {data} = await axios.get('/api/product');
        //axios req. the data to the server 
        setProducts(data);
      };
      fetchProducts ();
    },[]);
  return (  
    <>
     <h1>Latest Product</h1>
     <Row>
        {
            products.map((product)=>( 
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>

            ))

        } 
     </Row>
      
    </>
  )
}

export default HomeScreen
