// src/components/ReadTable.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Item {
    id: number;
    name: string;
    email: string;
    // Define other properties of your item
}

const ConfigTable: React.FC = () => {
    const [data, setData] = useState<Item[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Call the backend API to get the list of items
                const response = await axios.get<Item[]>('YOUR_GET_ALL_ITEMS_API_ENDPOINT');
                // Set the data with the fetched item list
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Read Table</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ConfigTable;
