import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        toast.error('User deleted!', {
          position: "top-center"
        });
        setUsers(users.filter(user => user.id !== id));
      });
  };

  return (
    <div>
      <h2>User List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Hobby</th>
            <th>Gender</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.hobby}</td>
              <td>{user.gender}</td>
              <td>{user.description}</td>
              <td>
                <Link to={`/edit/${user.id}`} className="btn btn-info mr-2 mx-2 fw-bold">Edit</Link>
                <button onClick={() => handleDelete(user.id)} className="btn btn-danger mx-2 fw-bold">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;