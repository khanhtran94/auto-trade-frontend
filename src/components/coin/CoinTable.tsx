import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Alert, Button, Table} from "antd";
import Item from "../../type/Item";

import {PlusCircleOutlined} from '@ant-design/icons';
import type {SizeType} from 'antd/es/config-provider/SizeContext';
import Coin from "../../type/Coin";
import ConfigForm from "../config/ConfigForm";
import CoinForm from "./CoinForm";
import {  message } from 'antd';

function CoinTable() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'This is a success message',
        });
    };

    const errorMessage = () => {
        messageApi.open({
            type: 'error',
            content: 'This is an error message',
        });
    };

    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'This is a warning message',
        });
    };


    const onCreate = async (values: any) => {
        try {
            // Gọi API để thêm một mục mới
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/coins`, values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                console.log('Config created successfully:', response.data);
                setOpen(false);

                // Nếu muốn tải lại dữ liệu sau khi thêm một mục mới, gọi fetchData()
                fetchCoins();
                success()
            } else {
                errorMessage()
                console.error('Error creating config:', response.data);
            }
        } catch (error: any) {
            debugger
            errorMessage()
            console.error('Error creating config:', error);
        }
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            key: 'symbol',
        }, {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        }
    ];
    const fetchCoins = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/coins`, {
                headers: {
                    'Content-Type': 'application/json',
                    'access-control-allow-origin': '*'
                }
            }).then((data) => ({
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, OPTION",
                    "Content-Type": "application/json"
                },
                data: data.data
            }));
            debugger
            setCoins(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching coin data:', error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCoins();
    }, []);
    const handleCreateClick = () => {
        setOpen(true);
    }

    return (
        <div>
            {contextHolder}
            <Button type="primary"
                    shape="round"
                    icon={<PlusCircleOutlined/>}
                    title={'Add'}
                    onClick={() => handleCreateClick()}/>
            <Table dataSource={coins} columns={columns}/>
            <CoinForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </div>
    );
}

export default CoinTable;
