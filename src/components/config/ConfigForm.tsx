import {Button, Form, Input, Modal, Radio} from 'antd';
import {useEffect} from "react";
import Item from "./types";


interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: Item) => void;
    onUpdate: (values: Item) => void;
    onCancel: () => void;
    selectedItem?: any;
}

const ConfigForm: React.FC<CollectionCreateFormProps> = ({
                                                             open,
                                                             onCreate,
                                                             onCancel,
                                                             onUpdate,
                                                             selectedItem
                                                         }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (selectedItem) {
            debugger
            // Set form fields based on the selectedItem
            form.setFieldsValue({
                id: selectedItem.id,
                code: selectedItem.code,
                description: selectedItem.description,
                value: selectedItem.value,
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
            open={open}
            title="Create a new collection"
            okText="Update"
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
                <Form.Item
                    name="code"
                    label="Code"
                    rules={[{required: true, message: 'Please input the title of collection!'}]}
                >
                    <Input/>
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