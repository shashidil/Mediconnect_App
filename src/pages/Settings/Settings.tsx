import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, Row, Col, notification, Spin } from 'antd';
import {GetStripeAccount, GetUserData, SetStripeAccount, UpdateStripeAccount} from "../../services/api/UserSettingsAPI";
import { UpdateUserData } from "../../services/api/UserSettingsAPI"; // Import the update function

export const Settings: React.FC = () => {
    const [form] = Form.useForm();
    const [stripeForm] = Form.useForm();
    const [isPharmacist, setIsPharmacist] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [stripeFormData, setStripeFormData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [stripeButtonClicked, setStripeButtonClicked] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true); // Set loading to true when starting to fetch data
            try {
                const userId = localStorage.getItem('userId');
                const storedAuthData = localStorage.getItem('user');
                if (userId) {
                    const data = await GetUserData(Number(userId));
                    const stripeAccount= await GetStripeAccount(Number(userId));

                    // Prepare formData based on fetched user data
                    setFormData({
                        username: data.username || '',
                        email: data.email || '',
                        firstName: data.firstName || '',
                        lastName: data.lastName || '',
                        phoneNumber: data.phoneNumber || '',
                        addressLine1: data.addressLine1 || '',
                        city: data.city || '',
                        states: data.states || '',
                        postalCode: data.postalCode || '',
                        pharmacyName: data.pharmacyName || '',
                    });
                    setStripeFormData({
                        stripeEmail:stripeAccount.email || ''
                    })

                    if(storedAuthData){
                        const authData =JSON.parse(storedAuthData);
                        const role = authData.roles ? authData.roles[0] : null;
                        if (role === 'ROLE_PHARMACIST') {
                            setIsPharmacist(true);
                        }
                    }

                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setError('Failed to fetch user data.');
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        form.setFieldsValue(formData);
        stripeForm.setFieldsValue(stripeFormData);
    }, [formData, form]);

    const handleFormSubmit = async (values: any) => {

        setUpdateLoading(true); 
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                await UpdateUserData(Number(userId), values);
                notification.success({
                    message: 'Update Successful',
                    description: 'User details have been updated successfully.',
                });
            }
        } catch (error) {
            console.error('Failed to update user data:', error);
            notification.error({
                message: 'Update Failed',
                description: 'Failed to update user details. Please try again.',
            });
        } finally {
            setUpdateLoading(false); 
        }
    };
    const handleStripeFormSubmit= async (values:any)=>{
        setUpdateLoading(true);
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                if(stripeButtonClicked ==='add'){
                    await SetStripeAccount(Number(userId), values.stripeEmail);
                    notification.success({
                        message: 'Successful',
                        description: 'The stripe account has been added successfully..',
                    });
                }
                else{
                    await UpdateStripeAccount(Number(userId), values.stripeEmail);
                    notification.success({
                        message: 'Update Successful',
                        description: 'The stripe account has been updated successfully..',
                    });
                }

            }
        } catch (error) {
            console.error('Failed to stripe account:', error);
            notification.error({
                message: 'Failed',
                description: 'Failed to complete. Please try again.',
            });
        } finally {
            setUpdateLoading(false); // Hide spinner after updating
        }
    }

    if (loading || updateLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', minHeight: '500px' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', minHeight: '500px' }}>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <Card style={{ minHeight: '85vh' }}>
            <div style={{ marginBottom: '24px' }}>
                <h1>Update User Details</h1>
                <hr style={{ border: '1px solid #ddd', margin: '8px 0' }} />
            </div>
            <Form
                form={form}
                onFinish={handleFormSubmit}
                initialValues={formData}
                layout="vertical"
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Username"
                            name="username"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please enter the email' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    {!isPharmacist && (
                        <>
                            <Col span={12}>
                                <Form.Item
                                    label="First Name"
                                    name="firstName"
                                    rules={[{ required: true, message: 'Please enter the first name' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Last Name"
                                    name="lastName"
                                    rules={[{ required: true, message: 'Please enter the last name' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Phone Number"
                                    name="phoneNumber"
                                    rules={[{ required: true, message: 'Please enter the phone number' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </>
                    )}
                    <Col span={12}>
                        <Form.Item
                            label="Address Line 1"
                            name="addressLine1"
                            rules={[{ required: true, message: 'Please enter the address line 1' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="City"
                            name="city"
                            rules={[{ required: true, message: 'Please enter the city' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="State"
                            name="states"
                            rules={[{ required: true, message: 'Please enter the state' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Postal Code"
                            name="postalCode"
                            rules={[{ required: true, message: 'Please enter the postal code' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    {isPharmacist && (
                        <Col span={12}>
                            <Form.Item
                                label="Pharmacy Name"
                                name="pharmacyName"
                                rules={[{ required: true, message: 'Please enter the pharmacy name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    )}
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit" 
                            style={{
                                background: '#2e384d',
                                color: 'white',}}
                            >
                                Update Details
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            {isPharmacist && (
                <>
                    <div style={{ marginBottom: '24px', marginTop: '30px' }}>
                        <h1>Update Stripe Email</h1>
                        <hr style={{ border: '1px solid #ddd', margin: '8px 0' }} />
                    </div>
                    <Form
                        form={stripeForm}
                        layout="vertical"
                        initialValues={stripeFormData}
                        onFinish={handleStripeFormSubmit}
                    >
                        <Row gutter={16} align="bottom">
                            <Col span={18}>
                                <Form.Item
                                    label="Stripe Email"
                                    name="stripeEmail"
                                    rules={[
                                        { required: true, message: 'Please enter the Stripe email' }, // Required field rule
                                        { type: 'email', message: 'Please enter a valid email address' }, // Email validation rule
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item style={{ textAlign: 'right', marginLeft: '20px' }}>
                                    {stripeFormData.stripeEmail === '' ? (
                                        <Button type="primary" htmlType="submit" onClick={()=>setStripeButtonClicked('add')}> {/* Make this button a submit button */}
                                            Add Stripe Email
                                        </Button>
                                    ) : (
                                        <Button type="primary" htmlType="submit" onClick={()=>setStripeButtonClicked('update')}> {/* Make this button a submit button */}
                                            Update Stripe Email
                                        </Button>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </>
            )}
        </Card>
    );
};