import {Form,Input} from "antd";
import {useState} from "react";

export const UserRegistration= () =>{
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({name: '', email: '',password:''});


    return(
        <>
            <Form
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                style={{maxWidth: 600}}
                //onFinish={handleFormSubmit}
                form={form}
            >
                <Form.Item label="Name" name="Name"   initialValue={formData.name} rules={[{ required: true }]}>
                    <Input
                        placeholder="Enter your name here"
                        name="name"
                        value={formData.name}
                        //onChange={handleInputChange}
                    />
                </Form.Item>
                <Form.Item label="Email" name="email" initialValue={formData.email} rules={[{ required: true }]}>
                    <Input
                        placeholder="Enter your email "
                        name="email"
                        value={formData.email}
                        //onChange={handleInputChange}

                    />
                </Form.Item>
                <Form.Item label="Password" name="password" initialValue={formData.password} rules={[{ required: true }]}>
                    <Input
                        placeholder="Enter your password "
                        name="password"
                        value={formData.password}
                        //onChange={handleInputChange}

                    />
                </Form.Item>
                <Form.Item label="Confirm password" name="confirmPassword" initialValue={formData.password} rules={[{ required: true }]}>
                    <Input
                        placeholder="Enter Confirm password "
                        name="confirmPassword"
                        value={formData.password}
                        //onChange={handleInputChange}

                    />
                </Form.Item>
            </Form>
        </>
    );
};