import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Table} from "antd";
import CollectionCreateForm from "./ConfigForm";

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
    const [open, setOpen] = useState(false);
    const onCreate = (values: any) => {
        console.log('Received values of form: ', values);
        setOpen(false);
    };

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
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <div>
                    <Button
                        type="primary"
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        Edit
                    </Button>
                    <CollectionCreateForm
                        open={open}
                        onCreate={onCreate}
                        onCancel={() => {
                            setOpen(false);
                        }}
                    />
                </div>
            ),
        }
    ];

    return (
        <div>
            <h2>Config Table</h2>
            <Table dataSource={data} columns={columns}/>
        </div>
    );
}

export default ConfigTable;
