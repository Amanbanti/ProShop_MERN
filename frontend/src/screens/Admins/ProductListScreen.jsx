import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';
import { LinkContainer } from "react-router-bootstrap"


const ProductListScreen = () => {
  const {data:products, isLoading,error,refetch} = useGetProductsQuery();
 
  const [createProduct, {isLoading:loadingCreate}]= useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
  useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure? You want to delete the product?')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const createProductHandler = async()=>{
        if(window.confirm('Are you sure you want to create a new Product?')){
            try {
                await createProduct();
                refetch();
                toast.success('Product Created!')
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
  }



  return (
    <>

        <Row className="align-items-center">
            <Col><h1>Products</h1></Col>
            <Col className="text-end">
                <Button onClick={createProductHandler} className="btn-sm m-3">
                    <FaEdit/> Create Product
                </Button>
            </Col>

        </Row>
        
        {loadingCreate && <Loader/>}
        

      {isLoading ? <Loader/> : error ? <Message variant='danger'>
        {error}
      </Message> :(
        <>
            <Table striped hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BARD</th>
                        <th></th>
                    </tr>

                </thead>

                <tbody>
                    {products.map((product)=>(
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>

                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button className="btn-sm" mx-2 variant="light">
                                            <FaEdit/>
                                    </Button>
                                </LinkContainer>

                                <Button 
                                    className="btn-sm" 
                                    mx-2  
                                    variant="danger"
                                    onClick={ ()=> deleteHandler(product._id)}
                                >
                                        <FaTrash style={{color:'white'}}/>
                                </Button>
                            </td>

                           
                        </tr> 
                    ))}
                </tbody>

            </Table>
     </>
      )} 
    </>
  )
}

export default ProductListScreen