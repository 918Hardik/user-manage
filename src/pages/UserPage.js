import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserForm from '../components/UserForm';

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => setUser(response.data))
        .catch(error => console.error('Error fetching user:', error));
    }
  }, [id]);

  const handleUserSubmit = (updatedUser) => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser)
      .then(response => console.log('User updated:', response.data))
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div>
      <h1>{id ? 'Edit User' : 'Create User'}</h1>
      <UserForm user={user} onSubmit={handleUserSubmit} />
    </div>
  );
};

export default UserPage;
