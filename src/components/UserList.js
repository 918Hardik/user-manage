import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        alert('Failed to fetch users. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div>
      <h1>User List</h1>
      {loading ? (
        <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
          <ul>
            {Array(10).fill().map((_, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <Skeleton circle={true} height={50} width={50} style={{ marginRight: '10px' }} />
                <div style={{ flex: 1 }}>
                  <Skeleton height={20} width={`80%`} />
                  <Skeleton height={20} width={`60%`} />
                </div>
              </li>
            ))}
          </ul>
        </SkeletonTheme>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Link to={`/user/${user.id}`} style={{ marginRight: '10px' }}>{user.name}</Link> - {user.email} - {user.phone}
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
