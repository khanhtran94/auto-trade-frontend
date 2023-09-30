import React, {useState, useEffect} from 'react';
import {Button, Table} from 'antd';
import SignForm from './SignForm';
import Item from "../../type/Item";
import {PlusCircleOutlined} from "@ant-design/icons";
import {SizeType} from "antd/es/config-provider/SizeContext";
import {signTelegramApi} from "../../apis/sign";
import {Sign} from "crypto"; // Đảm bảo bạn đã import SignForm từ file tương ứng

const SignTable = () => {
    const [data, setData] = useState<Sign[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Sign | null>(null);
    const [size, setSize] = useState<SizeType>('large'); // default is 'middle'

    const fetchData = async () => {
        try {
            // Gọi API để lấy dữ liệu Sign
            const response = await signTelegramApi.getAll();
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const onCreate = async (values: any) => {
        try {
            // Gọi API để thêm một mục mới
            // const response = await axios.post('API_URL_HERE', values);
            const response = await signTelegramApi.create(values);
            if (response.status === 201) {
                setOpen(false);
                await fetchData();
            } else {
                console.log("Error creating ", response.data);
            }
        } catch (error) {
            console.error('Error creating Sign:', error);
        }
    };

    const onUpdate = async (values: any) => {
        try {
            // Gọi API để cập nhật mục
            // const response = await axios.put(`API_URL_HERE/${values.id}`, values);
            // fetchData(); // Tải lại dữ liệu sau khi cập nhật mục
            const response = await signTelegramApi.update(values.id, values);

        } catch (error) {
            console.error('Error updating Sign:', error);
        }
        await fetchData();
        setOpen(false)
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditClick = (item: Sign) => {
        setSelectedItem(item);
        setOpen(true);
    };

    const handleCreateClick = () => {
        setOpen(true);
        setSelectedItem(null);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            key: 'symbol'
        },
        {
            title: 'Direction',
            dataIndex: 'direction',
            key: 'direction'
        },
        {
            title: 'Stoploss',
            dataIndex: 'stoploss',
            key: 'stoploss'
        },
        {
            title: 'Takeprofit',
            dataIndex: 'takeprofit',
            key: 'takeprofit'
        },
        {
            title: 'Entry From',
            dataIndex: 'entryFrom',
            key: 'entryFrom'
        },
        {
            title: 'Entry To',
            dataIndex: 'entryTo',
            key: 'entryTo'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Create Date',
            dataIndex: 'createDate',
            key: 'createDate'
        },
        {
            title: 'Update Date',
            dataIndex: 'updateDate',
            key: 'updateDate'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: Sign) => (
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
            <h2>Sign Table</h2>
            <Button
                type="primary"
                shape="round"
                icon={<PlusCircleOutlined/>}
                title={'Add'}
                size={size}
                onClick={() => handleCreateClick()}
            />
            <Table dataSource={data} columns={columns}/>
            <SignForm
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
};

export default SignTable;
