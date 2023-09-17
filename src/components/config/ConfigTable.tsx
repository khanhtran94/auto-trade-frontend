import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Table} from "antd";
import ConfigForm from "./ConfigForm";
import Item from "./types";

import { PlusCircleOutlined } from '@ant-design/icons';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

function ConfigTable() {
    const [data, setData] = useState<Item[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
    const fetchData = async () => {
        try {
            const response = await axios.get<Item[]>('http://127.0.0.1:8080/configs');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const onCreate = async (values: any) => {
        try {
            // Gọi API để thêm một mục mới
            const response = await axios.post('http://localhost:8080/configs', values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                console.log('Config created successfully:', response.data);
                setOpen(false);

                // Nếu muốn tải lại dữ liệu sau khi thêm một mục mới, gọi fetchData()
                fetchData();
            } else {
                console.error('Error creating config:', response.data);
            }
        } catch (error) {
            console.error('Error creating config:', error);
        }
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
    const handleCreateClick = () => {
        setOpen(true);
        setSelectedItem(null);
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

                </div>
            ),
        }
    ];

    return (
        <div>
            <h2>Config Table</h2>
            <Button type="primary" shape="round" icon={<PlusCircleOutlined />} size={size} title={'Add'}
            onClick={() => handleCreateClick()}/>
            <Table dataSource={data} columns={columns}/>
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
    );
}

export default ConfigTable;
