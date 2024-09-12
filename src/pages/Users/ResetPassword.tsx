import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Typography, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const { Title, Text, Link } = Typography;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || ''; // Provide a default value if token is null

  const openNotificationWithIcon = (type: 'success' | 'error', message: string, description: string) => {
    notification[type]({
      message,
      description,
    });
  };

  const handleSubmit = async (values: { newPassword: string }) => {
    try {
      if (token) {
        const response = await axios.post(
          `http://localhost:8080/api/auth/reset-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(values.newPassword)}`
        );
        
        // Show success notification if the password was changed successfully
        openNotificationWithIcon('success', 'Password Reset Successful', 'Your password has been successfully updated.');
      } else {
        openNotificationWithIcon('error', 'Invalid Token', 'The password reset token is invalid or expired.');
      }
    } catch (error) {
      openNotificationWithIcon('error', 'Error', 'There was an error resetting your password.');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '0 16px' }}>
      <Col xs={24} sm={20} md={12} lg={8} xl={6}>
        <div
          style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <LockOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
          </div>

          <Title level={3} style={{ fontSize: '24px' }}>Reset Password</Title>
          <Text type="secondary" style={{ fontSize: '16px', marginBottom: '20px', display: 'block' }}>
            Please enter your new password below.
          </Text>

          <Form
            name="reset-password"
            layout="vertical"
            onFinish={handleSubmit}
            style={{ marginTop: 24 }}
          >
            {/* New Password Input */}
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: 'Please enter your new password!',
                },
              ]}
            >
              <Input.Password placeholder="Enter new password" size="large" />
            </Form.Item>

            {/* Confirm Password Input */}
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['newPassword']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm your new password" size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Reset Password
              </Button>
            </Form.Item>
          </Form>

          <div style={{ marginTop: 16 }}>
            <Link href="/login">← Back to log in</Link>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ResetPassword;
