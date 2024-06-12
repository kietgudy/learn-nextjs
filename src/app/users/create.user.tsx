import { handleCreateUserAction } from '@/actions';
import {
    Modal, Input, Form, Row, Col, message
} from 'antd';

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const CreateUser = (props: IProps) => {

    const {
        isCreateModalOpen, setIsCreateModalOpen
    } = props;

    const [form] = Form.useForm();

    const handleCloseCreateModal = () => {
        form.resetFields()
        setIsCreateModalOpen(false);

    }

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const res = await handleCreateUserAction(values);
        if (res?.id) {
            handleCloseCreateModal();
            message.success("Create succeed!")
        }

    };

    return (
        <Modal
            title="Add new user"
            open={isCreateModalOpen}
            onOk={() => form.submit()}
            onCancel={() => handleCloseCreateModal()}
            maskClosable={false}
        >
            <Form
                name="basic"
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <Row gutter={[15, 15]}>
                    <Col span={24} md={12}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input type='email' />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default CreateUser;
