import {Form, Input, Modal, Select} from 'antd';
import React, {useEffect} from "react";
import Item from "../../type/Item";
import Coin from "../../type/Coin";
import configCodes from "../../ConfigCode";

const {Option} = Select;


interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: Item) => void;
    onUpdate: (values: Item) => void;
    onCancel: () => void;
    selectedItem?: any;
    coinList?: Coin[];
}

const ConfigForm: React.FC<CollectionCreateFormProps> = ({
                                                             open,
                                                             onCreate,
                                                             onCancel,
                                                             onUpdate,
                                                             selectedItem,
                                                             coinList,
                                                         }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (selectedItem) {
            // Set form fields based on the selectedItem
            form.setFieldsValue({
                id: selectedItem.id,
                code: selectedItem.code,
                description: selectedItem.description,
                value: selectedItem.value,
                coinId: selectedItem.coinId,
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
            debugger
            onCreate(values);
        }
        onCancel();
    };
    const handleChange = (value: string) => {
        // Xử lý khi giá trị thay đổi, có thể lưu vào state hoặc thực hiện các hành động khác
        console.log('Selected value:', value);
    };
    return (
        <Modal
            open={open}
            title="Create a new collection"
            okText="Save"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        debugger
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
                initialValues={{modifier: 'public'}}
            >
                <Form.Item name="coinId" label="coinId">
                    <Select placeholder="Select a coin"
                            onChange={handleChange}
                    >
                        {coinList && coinList.map((coin) => (
                            <Option value={coin.id}>
                                {coin.symbol}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>


                <Form.Item
                    name="code"
                    label="Code"
                    rules={[{required: true, message: 'Please input the title of collection!'}]}
                >
                    <Select
                        placeholder="Select a code"
                    >
                        {configCodes.map((configCode) => (
                            <Select.Option key={configCode.value} value={configCode.value}>
                                {configCode.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input type="textarea"/>
                </Form.Item>
                <Form.Item name="value" label="Value">
                    <Input type="textarea"/>
                </Form.Item>

            </Form>
        </Modal>
    );
};
export default ConfigForm;