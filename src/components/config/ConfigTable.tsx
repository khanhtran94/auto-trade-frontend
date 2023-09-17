import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Table} from "antd";

interface Item {
    id: number;
    name: string;
    email: string;
    // Define other properties of your item
}
interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

function ConfigTable() {
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

    const dataExample: DataType[] = [];
    for (let i = 0; i < 46; i++) {
        dataExample.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <div>
            <h2>Config Table</h2>
            <Table dataSource={data} columns={columns}/>
        </div>
    );
}

export default ConfigTable;
