import React, {useState, useEffect} from 'react';
import {Button, Table} from 'antd';
import SignTelegramForm from './SignTelegramForm';
import {PlusCircleOutlined} from "@ant-design/icons";
import {signTelegramApi} from "../../apis/signTelegram";
import SignTelegram from "../../type/SignTelegram";
import {SizeType} from "antd/es/config-provider/SizeContext"; // Đảm bảo bạn đã import SignTelegramForm từ file tương ứng

const SignTelegramTable = () => {
    const [data, setData] = useState<SignTelegram[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SignTelegram | null>(null);
    const [size, setSize] = useState<SizeType>('large'); // default is 'middle'

    const fetchData = async () => {
        try {
            // Gọi API để lấy dữ liệu SignTelegram
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
            console.error('Error creating SignTelegram:', error);
        }
    };

    const onUpdate = async (values: any) => {
        try {
            // Gọi API để cập nhật mục
            // const response = await axios.put(`API_URL_HERE/${values.id}`, values);
            // fetchData(); // Tải lại dữ liệu sau khi cập nhật mục
            const response = await signTelegramApi.update(values.id, values);

        } catch (error) {
            console.error('Error updating SignTelegram:', error);
        }
        await fetchData();
        setOpen(false)
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditClick = (item: SignTelegram) => {
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
            title: 'Group name',
            dataIndex: 'groupName',
            key: 'groupName'
        },
        {
            title: 'Context',
            dataIndex: 'context',
            key: 'context'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: SignTelegram) => (
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
            <h2>SignTelegram Table</h2>
            <Button
                type="primary"
                shape="round"
                icon={<PlusCircleOutlined/>}
                title={'Add'}
                size={size}
                onClick={() => handleCreateClick()}
            />
            <Table dataSource={data} columns={columns}/>
            <SignTelegramForm
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

export default SignTelegramTable;
