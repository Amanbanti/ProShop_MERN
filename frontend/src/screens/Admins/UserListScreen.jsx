import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTimes,FaEdit, FaCheck, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {useGetUsersQuery,useDeleteUserMutation} from '../../slices/usersApiSlice'
import { toast } from 'react-toastify';
import { LinkContainer } from "react-router-bootstrap"


const UserListScreen = () => {
  const [deleteUser, {isLoading:isDeleting}] = useDeleteUserMutation();
 

  const {data:users, isLoading,error,refetch} = useGetUsersQuery();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure? You want to delete this user?')) {
      try {
        await deleteUser(id);
        toast.success('User Deleted!')
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };




  return (
    <>

        <Row className="align-items-center">
            <Col><h1>Users</h1></Col>

        </Row>
        
      {isDeleting && <Loader/>}
      {isLoading ? <Loader/> : error ? <Message variant='danger'>
      {error?.data?.message || error.message || 'An error occurred'}
      </Message> :(
        <>
            <Table striped hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>

                </thead>

                <tbody>
                    {users.map((user)=>(
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                             <td>
                                {user.isAdmin ? (
                                   <FaCheck style={{ color: 'green' }} />
                                ) : (
                                  <FaTimes style={{ color: 'red' }} />
                                )}
                            </td>
       
          

                            <td>
                              
                              <LinkContainer to={`admin/user/${user._id}/edit`}>
    
                                <Button 
                                    className="btn-sm"
                                    variant="light"
                                >
                                     <FaEdit/>
                                </Button>

                              </LinkContainer>


                              <Button 
                                    className="btn-sm"
                                    variant="danger"
                                    onClick={ ()=> deleteHandler(user._id)}
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

export default UserListScreen