import {Form, Input, Modal} from 'antd';
import React, {useEffect} from "react";
import Coin from "../../type/Coin";


interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: Coin) => void;
    onCancel: () => void;
}

const CoinForm: React.FC<CollectionCreateFormProps> = ({
                                                           open,
                                                           onCreate,
                                                           onCancel
                                                       }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.resetFields();
    }, [form]);

    const onFinish = (values: any) => {
        onCreate(values);
        form.resetFields();
        onCancel();
    };
    return (
        <Modal
            open={open}
            title="Create a new coin"
            okText="Save"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        debugger
                        onFinish(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}>
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={
                    {
                        modifier: 'public'
                    }
                }>
                <Form.Item
                    name="symbol"
                    label="Symbol">
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price">
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default CoinForm;