import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Table} from "antd";
import ConfigForm from "./ConfigForm";
import Item from "./types";


function ConfigTable() {
    const [data, setData] = useState<Item[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const fetchData = async () => {
        try {
            const response = await axios.get<Item[]>('http://127.0.0.1:8080/configs');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const onCreate = (values: any) => {
        console.log('Received values of form: ', values);
        setOpen(false);
    };
    const onUpdate = async (values: any) => {
        try {
            debugger
            const response = await axios.put(`http://localhost:8080/configs/${values.id}`, values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Config updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating config:', error);
        }
        fetchData();
        setOpen(false);
    };
    useEffect(() => {
        fetchData();
    }, []);
    console.log(data)
    const handleEditClick = (item: Item) => {
        setSelectedItem(item);
        setOpen(true);
    };
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
            render: (text: string, record: Item) => (
                <div>
                    <Button
                        type="primary"
                        onClick={() => handleEditClick(record)}
                    >
                        Edit
                    </Button>
                    <ConfigForm
                        open={open}
                        onCreate={onCreate}
                        onUpdate={onUpdate}
                        onCancel={() => {
                            setOpen(false);
                        }}
                        selectedItem={selectedItem}
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
