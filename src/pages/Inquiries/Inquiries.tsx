import React, { useState } from "react";
import { Card, Form, Input, Button, Row, Col, Image, notification, Spin } from "antd";
import img from "../../assets/contact-us.jpg";
import {CreateInquiry} from "../../services/api/InquiresAPI";

export const Inquiries: React.FC = () => {
    const [form] = Form.useForm();
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFormChange = () => {
        const fields = form.getFieldsValue();
        const isValid = fields.title && fields.description;
        setIsFormValid(isValid);
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        const userId = localStorage.getItem('userId');
        const senderId = userId ? parseInt(userId) : null;

        if (!senderId) {
            notification.error({
                message: "Error",
                description: "User ID not found. Please log in again.",
            });
            setLoading(false);
            return;
        }

        try {
            await CreateInquiry({
                subject: values.title,
                message: values.description,
                status: "Pending",
                senderId: senderId,
            });

            notification.success({
                message: "Inquiry Created",
                description: "Your inquiry has been successfully submitted!",
            });
            form.resetFields();
        } catch (error) {
            notification.error({
                message: "Error",
                description: "There was an issue submitting your inquiry. Please try again later.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card style={{ minHeight: '85vh' }}>
            <div style={{ marginBottom: '24px' }}>
                <h1>Support</h1>
                <hr style={{ border: '1px solid #ddd', margin: '8px 0' }} />
            </div>
            <Row gutter={32}>
                <Col xs={24} md={12}>
                    <p style={{ fontSize: '16px', marginBottom: '24px' }}>
                        If you have any questions, concerns, or need further information, please fill out the form below with the details of your inquiry.
                        Our team is here to assist you and will respond as soon as possible. We look forward to helping you!
                    </p>
                    <Form
                        form={form}
                        layout="vertical"
                        onValuesChange={onFormChange}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                { required: true, message: 'Please input the title!' },
                            ]}
                        >
                            <Input placeholder="Enter the title" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                { required: true, message: 'Please input the description!' },
                            ]}
                        >
                            <Input.TextArea placeholder="Enter the description" rows={4} />
                        </Form.Item>
                        <Form.Item>
                            <Button
                            style={{
                                background: '#2e384d',
                                color: 'white',}}
                                type="primary"
                                htmlType="submit"
                                disabled={!isFormValid || loading}
                            >
                                {loading ? <Spin size="small" /> : "Submit"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={24} md={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        src={img}
                        alt="Contact Us"
                        preview={false}
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                </Col>
            </Row>
        </Card>
    );
};
