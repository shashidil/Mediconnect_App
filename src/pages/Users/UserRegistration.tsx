import {Form,Input,Tabs,Button,Row,Col,notification} from "antd";
import {useState} from "react";
import { UserOutlined, PhoneOutlined, CheckCircleOutlined, NumberOutlined, MailOutlined ,EyeInvisibleOutlined, EyeTwoTone,EnvironmentOutlined,CloseCircleOutlined} from '@ant-design/icons';
import { registerUser } from "../../services/api/UserAuthApi";
import {checkRegNumber} from "../../services/api/RegnumberAPI";
import { SignupDto } from "../../Interfaces/signupDto";
import signIn from "../../assets/signin.png";
import medicarePharmacist from "../../assets/medicarePharmacist.png";

const { TabPane } = Tabs;

export const UserRegistration= () =>{
    const [form] = Form.useForm();
    const [validRegNumber, setValidRegNumber] = useState(false);

    const [signupDto, setSignupDto] = useState<SignupDto>({
        signupRequestPatient: {
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
          role: ['customer'], 
      },
      signupRequestPharmacist: {
          username: '',
          email: '',
          password: '',
          pharmacyName: '',
          regNumber: '',
          addressLine1: '',
          city: '',
          states: '',
          postalCode: '',
          role: ['pharmacist'], 
      },
  });
  const handleRegNumberCheck = async (regNumber: string) => {
    try {
        const isValid = await checkRegNumber(regNumber); 
        setValidRegNumber(isValid);
        if (isValid) {
            notification.success({
                message: 'Registration Number Verified',
                description: 'The registration number is valid',
            });
        } else {
            notification.error({
                message: 'Invalid Registration Number',
                description: 'The registration number is not valid',
            });
        }
    } catch (error) {
        setValidRegNumber(false);
        notification.error({
            message: 'Error',
            description: 'Failed to validate registration number',
        });
    }
};

    const handlePatientFormSubmit = async (values: any) => {
      const formData = { ...values, role: ['customer'] };
  
      try {
        setSignupDto({ ...signupDto, signupRequestPatient: formData });
          const response = await registerUser( signupDto );
          handleResponse(response);
      } catch (error) {
          handleError(error);
      }
  };
  
  const handlePharmacistFormSubmit = async (values: any) => {
      const formData = { ...values, role: ['Pharmacist'] };
      try {
        setSignupDto({ ...signupDto, signupRequestPharmacist: formData });
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
            <div style={{width:'1200px', margin:'0 auto',padding:'60px 0'}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="As a Patient" key="1">
                        <Row gutter={16} justify="center">
                            <Col span={10}>
                                <Form
                                    form={form}
                                    onFinish={handlePatientFormSubmit}
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 14, offset: 6 }}
                                    layout="horizontal"
                                    initialValues={signupDto.signupRequestPatient}
                                >
                                <Form.Item name="activeTab" initialValue="1" hidden />
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please enter your User Name' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<UserOutlined />} placeholder="User Name" />
                                </Form.Item>
                                <Form.Item
                                    name="firstName"
                                    rules={[{ required: true, message: 'Please enter your First Name' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<UserOutlined />} placeholder="First Name" />
                                </Form.Item>
                                <Form.Item
                                    name="lastName"
                                    rules={[{ required: true, message: 'Please enter your Last name' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<UserOutlined />} placeholder="Last Name" />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Please enter your Email' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<MailOutlined />} placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    name="addressLine1"
                                    rules={[{ required: true, message: 'Please enter your Address1' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<EnvironmentOutlined />} placeholder="Address Line 1" />
                                </Form.Item>
                                <Form.Item
                                    name="city"
                                    rules={[{ required: true, message: 'Please enter your city' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<EnvironmentOutlined />} placeholder="City" />
                                </Form.Item>

                                <Form.Item
                                    name="states"
                                    rules={[{ required: true, message: 'Please enter your state' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<EnvironmentOutlined />} placeholder="state" />
                                </Form.Item>
                                <Form.Item
                                    name="postalCode"
                                    rules={[{ required: true, message: 'Please enter your postalcode' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<EnvironmentOutlined />} placeholder="Postal Code" />
                                </Form.Item>
            
                                <Form.Item
                                    name="phoneNumber"
                                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<PhoneOutlined />} placeholder="Phone" />
                                </Form.Item>
                                
                                {/* <Form.Item

                                    name="addressLine1"
                                    rules={[{ required: true, message: 'Please enter your address' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<EnvironmentOutlined />} placeholder="Enter your address" />
                                </Form.Item>
                                <Form.Item
                                    name="city"
                                    rules={[{ required: true, message: 'Please enter your city' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<EnvironmentOutlined />} placeholder="Enter your city" />
                                </Form.Item>
                                <Form.Item
                                    name="postalCode"
                                    rules={[{ required: true, message: 'Please enter your postal code' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<EnvironmentOutlined />} placeholder="Enter your postal code" />
                                </Form.Item> */}
                                 <Form.Item  name="password" initialValue="" rules={[{ required: true, message: 'Please enter your password' }]}>
                                <Input.Password style={{padding:'10px',left:'-120px' }} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} placeholder="Enter your password" />
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
                                <Input.Password style={{padding:'10px',left:'-120px' }} placeholder="Enter Confirm password" />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                                    <Button style={{background:'#2e384d',display:'flex',justifyContent:'center',alignItems:'center',width:'100%',padding:'20px',left:'-120px'}} type="primary" htmlType="submit" onClick={() => form.submit()}>
                                        SIGNUP 
                                    </Button>
                                </Form.Item>
                                </Form>
                            </Col>
                            <Col span={14}>
                                <img src={signIn} alt="Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="As a Pharmacist" key="2">
                        <Row gutter={16} justify="center">
                            <Col span={10}>
                                <Form
                                    form={form}
                                    onFinish={handlePharmacistFormSubmit}
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 14, offset: 6 }}
                                    layout="horizontal"
                                    initialValues={signupDto.signupRequestPharmacist}
                                    onBlur={()=>handleRegNumberCheck}
                                >
                                <Form.Item name="activeTab" initialValue="2" hidden />
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please enter your User Name' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<UserOutlined />} placeholder="User Name" />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Please enter your Email' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<MailOutlined />} placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    name="pharmacyName"
                                    rules={[{ required: true, message: 'Please enter your pharmacy Name' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<UserOutlined />} placeholder="Pharmacy Name" />
                                </Form.Item>
                                
                                <Form.Item
                                    name="regNumber"
                                    rules={[{ required: true, message: 'Please enter your pharmacy RegNo' }]}
                                >
                                    <Input
                                            prefix={<NumberOutlined />}
                                            style={{padding:'10px',left:'-120px' }}
                                            placeholder="Registration Number"
                                            onBlur={(e) => handleRegNumberCheck(e.target.value)}
                                            suffix={validRegNumber ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}
                                        />
                                </Form.Item>
                                {/* <Form.Item
                                    name="address"
                                    rules={[{ required: true, message: 'Please enter your Address' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<UserOutlined />} placeholder="Address" />
                                </Form.Item> */}
                                <Form.Item
                                    name="addressLine1"
                                    rules={[{ required: true, message: 'Please enter your Address1' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<EnvironmentOutlined />} placeholder="Address Line 1" />
                                </Form.Item>
                                {/* <Form.Item
                                    name="regNumber"
                                    rules={[{ required: true, message: 'Please enter your registration number' }]}
                                >
                                    <Input style={{padding:'10px',left:'-120px' }} prefix={<NumberOutlined />} placeholder="Enter your registration number" />
                                </Form.Item>
                                <Form.Item
                                    name="addressLine1"
                                    rules={[{ required: true, message: 'Please enter your address' }]}
                                >
                                    <Input style={{padding:'10px',left:'-120px' }} prefix={<EnvironmentOutlined />} placeholder="Enter your address" />
                                </Form.Item> */}
                                <Form.Item
                                    name="city"
                                    rules={[{ required: true, message: 'Please enter your city' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<EnvironmentOutlined />} placeholder="City" />
                                </Form.Item>
                                <Form.Item
                                    name="states"
                                    rules={[{ required: true, message: 'Please enter your states' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<EnvironmentOutlined />} placeholder="states" />
                                </Form.Item>
                                <Form.Item
                                    name="postalCode"
                                    rules={[{ required: true, message: 'Please enter your postalcode' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<EnvironmentOutlined />} placeholder="Postal Code" />
                                </Form.Item>
                                {/* <Form.Item
                                    name="phoneNumber"
                                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                                >
                                <Input style={{padding:'10px',left:'-120px' }} prefix={<PhoneOutlined />} placeholder="Phone" />
                                </Form.Item> */}
                                <Form.Item  name="password" initialValue="" rules={[{ required: true, message: 'Please enter your password' }]}>
                                <Input.Password style={{padding:'10px',left:'-120px' }} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} placeholder="Enter your password" />
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
                                <Input.Password style={{padding:'10px',left:'-120px' }} placeholder="Enter Confirm password" />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                                    <Button style={{background:'#2e384d',display:'flex',justifyContent:'center',alignItems:'center',width:'100%',padding:'20px',left:'-120px'}} type="primary"  onClick={() => form.submit()} >
                                    SIGNUP 
                                    </Button>
                                </Form.Item>
                                </Form>
                            </Col>
                            <Col span={14}>
                                <img src={medicarePharmacist} alt="Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>
        </>
    );
};
