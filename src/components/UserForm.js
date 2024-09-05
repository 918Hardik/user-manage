import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState(user || { name: '', email: '', phone: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/users', formData)
      .then(response => onSubmit(response.data))
      .catch(error => console.error('Error creating user:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
