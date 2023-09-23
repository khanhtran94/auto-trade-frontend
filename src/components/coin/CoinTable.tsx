import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Table} from "antd";
import Item from "../../type/Item";

import {PlusCircleOutlined} from '@ant-design/icons';
import type {SizeType} from 'antd/es/config-provider/SizeContext';
import Coin from "../../type/Coin";

function CoinTable() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);

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
        }
    ];
    const fetchCoins = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8080/coins');
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

    return (
        <div>
            <Table dataSource={coins} columns={columns}/>
        </div>
    );
}

export default CoinTable;
