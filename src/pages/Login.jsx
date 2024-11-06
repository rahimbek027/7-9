import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Input, Button, message } from 'antd';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); // Sahifalar o'rtasida navigatsiya qilish uchun

  // Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required('Please input your username!'),
    email: Yup.string().email('Invalid email address').required('Please input your email!'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Please input your password!'),
  });

  // Formikni yuborish
  const onSubmit = (values) => {
    message.success('Login successful');
    navigate('/students'); // Login muvaffaqiyatli bo'lsa, students sahifasiga yo\'naltirish
  };

  return (
    <div className="login-container"> {/* To'liq ekran login sahifasi */}
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ touched, errors }) => (
          <Form style={{ maxWidth: 400 }}>
            <h2>Login</h2>

            {/* Username */}
            <div>
              <Field
                name="username"
                render={({ field }) => <Input {...field} placeholder="Username" />}
              />
              <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
            </div>

            {/* Email */}
            <div>
              <Field
                name="email"
                render={({ field }) => <Input {...field} placeholder="Email" />}
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </div>

            {/* Password */}
            <div>
              <Field
                name="password"
                render={({ field }) => <Input.Password {...field} placeholder="Password" />}
              />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </div>

            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
