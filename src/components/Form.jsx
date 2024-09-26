import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    username: '',
    email: '',
    hobby: '',
    gender: '',
    description: ''
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/users/${id}`)
        .then(response => response.json())
        .then(data => setUser(data));
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:5000/users/${id}` : 'http://localhost:5000/users';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(() => {
        toast.success(id ? 'User updated!' : 'User added!', {
          position: "top-center"
        });
        navigate('/users');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className='fw-bold my-3'>Username</label>
        <input type="text" className="form-control" name="username" value={user.username} onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label className='fw-bold my-3'>Email</label>
        <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label className='fw-bold my-3'>Hobby</label>
        <select className="form-control" name="hobby" value={user.hobby} onChange={handleChange}>
          <option value="">Select Hobby</option>
          <option value="Reading">Reading</option>
          <option value="Gaming">Gaming</option>
          <option value="Traveling">Traveling</option>
        </select>
      </div>
      <div className="form-group">
        <label className='fw-bold my-3'>Gender</label>
        <div>
          <label className='fw-bold my-3'>
            <input type="radio" name="gender" className='mx-2' value="Male" checked={user.gender === 'Male'}
             onChange={handleChange}/> Male</label>
          <label className='fw-bold my-3'>
            <input type="radio" name="gender" className='mx-2' value="Female" checked={user.gender === 'Female'} 
            onChange={handleChange}/> Female</label>
        </div>
      </div>
      <div className="form-group">
        <label className='fw-bold my-3'>Description</label>
        <textarea className="form-control" name="description" value={user.description} onChange={handleChange}/>
      </div>
      <button type="submit" className="btn btn-primary my-3">Submit</button>
    </form>
  );
};

export default Form;