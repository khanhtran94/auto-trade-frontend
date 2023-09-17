import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Table} from "antd";

interface Item {
    id: number;
    code: string;
    description: string;
    value: string;
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
                const response = await axios.get<Item[]>('http://127.0.0.1:8080/configs');
                // Set the data with the fetched item list
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    console.log(data)
    const dataExample: DataType[] = [];
    for (let i = 0; i < 46; i++) {
        dataExample.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },

        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
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
