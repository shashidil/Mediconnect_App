import React from "react";
import {Form,Input,Tabs} from "antd";


export const UserSignup  = ()=>{

    const [form] = Form.useForm();
    const handleFormSubmit = (values: any) => {
        console.log('Form values:', values);
      };
    return(
        <>
         <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onFinish={handleFormSubmit}
          form={form}
        >
          <Form.Item label="Name" name="Name" initialValue="" rules={[{ required: true, message: 'Please enter your name' }]}>
            <Input placeholder="Enter your name here" />
          </Form.Item>
          <Form.Item label="Email" name="email" initialValue="" rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password" initialValue="" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item
            label="Confirm password"
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
        </Form>
        
        </>
    )
}