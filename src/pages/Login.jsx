import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); // Sahifalar o'rtasida navigatsiya qilish uchun

  // Formni yuborish
  const onFinish = (values) => {
    // Foydalanuvchi ma'lumotlarini localStorage-ga saqlash
    localStorage.setItem('user', JSON.stringify(values));

    // Success xabari
    message.success('Login successful');

    // Keyingi sahifaga yo\'naltirish
    navigate('/students');
  };

  return (
    <div className="login-container">
      <Form onFinish={onFinish} style={{ maxWidth: 400 }}>
        <h2>Login</h2>

        {/* Username */}
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Log in
        </Button>
      </Form>
    </div>
  );
};

export default Login;
