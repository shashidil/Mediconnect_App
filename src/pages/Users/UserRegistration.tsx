import {Form,Input,Tabs,Button,Row,Col,notification} from "antd";
import {useState} from "react";
import { UserOutlined, PhoneOutlined, ShopOutlined, NumberOutlined, EnvironmentOutlined ,EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import { registerUser } from "../../services/api/UserAuthApi";
import { SignupDto } from "../../Interfaces/signupDto";

const { TabPane } = Tabs;

export const UserRegistration= () =>{
    const [form] = Form.useForm();

    const [signupDto, setSignupDto] = useState<SignupDto>({
      patientRequest: {
          username: '',
          lastName: '',
          firstName: '',
          email: '',
          password: '',
          phoneNumber: '',
          addressLine1: '',
          city: '',
          states: '',
          postalCode: '',
          role: ['customer'], // Assuming 'customer' as default role for patient
      },
      pharmacistRequest: {
          username: '',
          email: '',
          password: '',
          pharmacyName: '',
          regNumber: '',
          addressLine1: '',
          city: '',
          states: '',
          postalCode: '',
          role: ['pharmacist'], // Assuming 'pharmacist' as default role for pharmacist
      },
  });


    const handlePatientFormSubmit = async (values: any) => {
      const formData = { ...values, role: ['customer'] };
  
      try {
        setSignupDto({ ...signupDto, patientRequest: formData });
          const response = await registerUser( signupDto );
          handleResponse(response);
      } catch (error) {
          handleError(error);
      }
  };
  
  const handlePharmacistFormSubmit = async (values: any) => {
      const formData = { ...values, role: ['pharmacist'] };
      try {
        setSignupDto({ ...signupDto, pharmacistRequest: formData });
          const response = await registerUser( signupDto);
          handleResponse(response);
      } catch (error) {
          handleError(error);
      }
  };
  const handleResponse = (response: any) => {
    if (response.status === 200) {
        notification.success({
            message: 'Success',
            description: 'User registered successfully',
        });
    } else {
        notification.error({
            message: 'Error',
            description: 'Failed to register user',
        });
    }
};

const handleError = (error: any) => {
  console.error('Error:', error);
  notification.error({
      message: 'Error',
      description: 'Failed to update data to the backend',
  });
};




    return(
        <>
      <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="AS A PATIENT" key="1">
                <Row gutter={16} justify="center">
                    <Col span={12}>
                        <Form
                            form={form}
                            onFinish={handlePatientFormSubmit}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14, offset: 6 }}
                            layout="horizontal"
                            initialValues={signupDto.patientRequest}
                        >
                            <Form.Item name="activeTab" initialValue="1" hidden />
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please enter your username' }]}
                                
                        
                            >
                                <Input prefix={<UserOutlined />} placeholder="Enter your username" />
                            </Form.Item>
                            <Form.Item
                                name="firstName"
                                rules={[{ required: true, message: 'Please enter your first name' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Enter your first name" />
                            </Form.Item>
                            <Form.Item
                                name="lastName"
                                rules={[{ required: true, message: 'Please enter your last name' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Enter your last name" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please enter your email' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Enter your email" />
                            </Form.Item>
                            <Form.Item  name="password" initialValue="" rules={[{ required: true, message: 'Please enter your password' }]}>
                              <Input.Password iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} placeholder="Enter your password" />
                            </Form.Item>
                            <Form.Item
          
                                name="confirmPassword"
                                initialValue=""
                                dependencies={['password']}
                                rules={[
                                  { required: true, message: 'Please confirm your password' },
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject(new Error('The two passwords do not match'));
                                    },
                                  }), 
                                ]}
          >
                              <Input.Password placeholder="Enter Confirm password" />
                            </Form.Item>
                            <Form.Item
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Please enter your phone number' }]}
                            >
                                <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
                            </Form.Item>
                            <Form.Item
                                name="addressLine1"
                                rules={[{ required: true, message: 'Please enter your address' }]}
                            >
                                <Input prefix={<EnvironmentOutlined />} placeholder="Enter your address" />
                            </Form.Item>
                            <Form.Item
                                name="city"
                                rules={[{ required: true, message: 'Please enter your city' }]}
                            >
                                <Input prefix={<EnvironmentOutlined />} placeholder="Enter your city" />
                            </Form.Item>
                            <Form.Item
                                name="postalCode"
                                rules={[{ required: true, message: 'Please enter your postal code' }]}
                            >
                                <Input prefix={<EnvironmentOutlined />} placeholder="Enter your postal code" />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                                <Button type="primary" htmlType="submit">
                                    SIGNUP
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={12}>
                        <img src="" alt="Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </Col>
                </Row>
            </TabPane>
            <TabPane tab="AS A PHARMACIST" key="2">
                <Row gutter={16} justify="center">
                    <Col span={12}>
                        <Form
                            form={form}
                            onFinish={handlePharmacistFormSubmit}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14, offset: 6 }}
                            layout="horizontal"
                            initialValues={signupDto.pharmacistRequest}
                        >
                            <Form.Item name="activeTab" initialValue="2" hidden />
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please enter your email' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Enter your email" />
                            </Form.Item>
                            <Form.Item  name="password" initialValue="" rules={[{ required: true, message: 'Please enter your password' }]}>
                               <Input.Password iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} placeholder="Enter your password" />
                            </Form.Item>
                            <Form.Item
                              
                                name="confirmPassword"
                                initialValue=""
                                dependencies={['password']}
                                rules={[
                                  { required: true, message: 'Please confirm your password' },
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject(new Error('The two passwords do not match'));
                                    },
                                  }),
                                ]}
          >
                               <Input.Password placeholder="Enter Confirm password" />
          </Form.Item>
                            <Form.Item
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Please enter your phone number' }]}
                            >
                                <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
                            </Form.Item>
                            <Form.Item
                                name="pharmacyName"
                                rules={[{ required: true, message: 'Please enter your pharmacy name' }]}
                            >
                                <Input prefix={<ShopOutlined />} placeholder="Enter your pharmacy name" />
                            </Form.Item>
                            <Form.Item
                                name="regNumber"
                                rules={[{ required: true, message: 'Please enter your registration number' }]}
                            >
                                <Input prefix={<NumberOutlined />} placeholder="Enter your registration number" />
                            </Form.Item>
                            <Form.Item
                                name="addressLine1"
                                rules={[{ required: true, message: 'Please enter your address' }]}
                            >
                                <Input prefix={<EnvironmentOutlined />} placeholder="Enter your address" />
                            </Form.Item>
                            <Form.Item
                                name="city"
                                rules={[{ required: true, message: 'Please enter your city' }]}
                            >
                                <Input prefix={<EnvironmentOutlined />} placeholder="Enter your city" />
                            </Form.Item>
                            <Form.Item
                                name="states"
                                rules={[{ required: true, message: 'Please enter your state' }]}
                            >
                                <Input prefix={<EnvironmentOutlined />} placeholder="Enter your state" />
                            </Form.Item>
                            <Form.Item
                                name="postalCode"
                                rules={[{ required: true, message: 'Please enter your postal code' }]}
                            >
                                <Input prefix={<EnvironmentOutlined />} placeholder="Enter your postal code" />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={12}>
                        <img src="" alt="Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
    


        </>
    );
};