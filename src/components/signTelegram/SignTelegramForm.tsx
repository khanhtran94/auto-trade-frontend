import React, { useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import SignTelegram from '../../type/SignTelegram'; // Đảm bảo bạn import kiểu dữ liệu SignTelegram từ file tương ứng

const { Option } = Select;

interface SignTelegramFormProps {
    open: boolean;
    onCreate: (values: SignTelegram) => void;
    onUpdate: (values: SignTelegram) => void;
    onCancel: () => void;
    selectedItem?: SignTelegram;
}

const SignTelegramForm: React.FC<SignTelegramFormProps> = ({
                                                               open,
                                                               onCreate,
                                                               onCancel,
                                                               onUpdate,
                                                               selectedItem,
                                                           }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue({
                symbol: selectedItem.symbol,
                groupName: selectedItem.groupName,
                context: selectedItem.context,
                status: selectedItem.status,
                // ... Map other fields accordingly based on your SignTelegram model
            });
        } else {
            form.resetFields();
        }
    }, [selectedItem, form]);

    const onFinish = (values: any) => {
        if (selectedItem) {
            // If initialValues exist, it's an update operation
            // Call update function
            onUpdate(values);
        } else {
            // If initialValues doesn't exist, it's a create operation
            // Call create function
            onCreate(values);
        }
        onCancel();
    };

    return (
        <Modal
            visible={open}
            title={selectedItem ? 'Update SignTelegram' : 'Create a new SignTelegram'}
            okText="Save"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        if (selectedItem) {
                            values.id = selectedItem.id;
                        }
                        onFinish(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public' }}
            >
                <Form.Item
                    name="symbol"
                    label="Symbol"
                    rules={[{ required: true, message: 'Please input the symbol!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="groupName"
                    label="Group Name"
                    rules={[{ required: true, message: 'Please input the group name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="context" label="Context">
                    <Input.TextArea />
                </Form.Item>

                {/* Add other fields based on your SignTelegram model */}
            </Form>
        </Modal>
    );
};

export default SignTelegramForm;
