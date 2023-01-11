import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { listUsers } from '../redux/actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const UserListScreen = () => {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList
    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch ])

    const deleteHandler = () => {
    }

    return (
        <>
            <h1>Users</h1>

            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <table className="table table-hover">
                    <thead>
                        <tr className="table-primary">
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">ADMIN</th>
                            <th className="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td scope="row">{user._id}</td>
                                <td>{user.name}</td>
                                <td> <a href={`mailot:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? <i class="fa-solid fa-check text-success"></i> : <i class="fa-solid fa-xmark text-danger"></i>}</td>
                                <td>
                                    <Link  className="btn btn-sm btn-warning" to={`/user/${user._id}/edit`}><i class="fa-regular fa-pen-to-square"></i></Link> 
                                    <button className="btn btn-sm btn-danger" onClick={() => deleteHandler(user._id)}><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default UserListScreen