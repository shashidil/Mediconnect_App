import { useState } from 'react';
import axios from 'axios';
import { Row, Col, Form, Input, Button, Typography, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;

const ForgotPassword = () => {
    const [email, setEmail] = useState('');


    const openNotificationWithIcon = (type: 'success' | 'error', message: string, description: string) => {
        notification[type]({
            message,
            description,
        });
    };

    const handleSubmit = async (values: { email: string }) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/auth/forgot-password?email=${encodeURIComponent(values.email)}`,
                {}, 
                {
                    headers: {
                        'Platform': 'Web', 
                    },
                }
            );
            
      
            openNotificationWithIcon('success', 'Email Sent', 'Reset instructions have been sent to your email.');
        } catch (error) {
          
            openNotificationWithIcon('error', 'Error', 'Something went wrong while sending the reset instructions.');
        }
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Col xs={22} sm={16} md={12} lg={8} xl={6}>
                <div
                    style={{
                        backgroundColor: 'white',
                        padding: '40px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                    }}
                >
                    <div style={{ marginBottom: 24 }}>
                        <LockOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                    </div>

                    <Title level={3}>Forgot password?</Title>
                    <Text type="secondary">No worries, we'll send you reset instructions.</Text>

                    <Form
                        name="forgot-password"
                        layout="vertical"
                        onFinish={handleSubmit}
                        style={{ marginTop: 24 }}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email!',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter your email"
                                size="large"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block size="large">
                                Send Email
                            </Button>
                        </Form.Item>
                    </Form>

                    <div style={{ marginTop: 16 }}>
                        <Link href="/signin">← Back to log in</Link>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default ForgotPassword;
