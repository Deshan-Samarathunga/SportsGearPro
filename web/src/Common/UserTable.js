import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LayoutNew from '../Layout';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [search, sort]);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/AdUsers', {
                params: { search, sort },
            });
            console.log('Fetched users:', data); // Log the fetched data
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/AdUsers/${id}`);
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <LayoutNew>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Admin Panel</h1>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        padding: '10px',
                        marginRight: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        width: '300px',
                    }}
                />
                <select
                    onChange={(e) => setSort(e.target.value)}
                    style={{
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                >
                    <option value="">Sort</option>
                    <option value="asc">Sort by Name Ascending</option>
                    <option value="desc">Sort by Name Descending</option>
                    <option value="createdAtAsc">Sort by Created At Ascending</option>
                    <option value="createdAtDesc">Sort by Created At Descending</option>
                </select>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4' }}>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Name</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Email</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Address</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Phone</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Created At</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{user.name}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{user.email}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{user.address}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{user.contactNo}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{new Date(user.createdAt).toLocaleString()}</td>
                            <td>
                                <button 
                                    onClick={() => deleteUser(user._id)} 
                                    style={{
                                        padding: '5px 10px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        backgroundColor: '#ff4d4d',
                                        color: 'white',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </LayoutNew>
    );
};

export default UserTable;
