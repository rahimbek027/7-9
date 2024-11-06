import React, { useState, useEffect } from 'react';
import { List, Button, Modal, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Students = () => {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modalni ko'rsatish uchun state
  const [form] = Form.useForm(); // Formni yaratish uchun

  const navigate = useNavigate();

  // Foydalanuvchi ma'lumotlarini localStorage'dan olish
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/'); // Agar user ma'lumotlari yo'q bo'lsa, login sahifasiga yo'naltirish
    }
  }, [navigate]);

  // Student qo'shish formasi
  const onCreateStudent = (values) => {
    const newStudent = {
      name: values.name,
      age: values.age,
      address: values.address,
    };

    setStudents([...students, newStudent]); // Yangi studentni ro'yxatga qo'shish
    form.resetFields(); // Formni tozalash
    setIsModalVisible(false); // Modalni yopish
    message.success('Student successfully added!');
  };

  // Modalni ko'rsatish
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Modalni yopish
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="students-container">
      <h2>Students List</h2>

      {/* Foydalanuvchi ma'lumotlarini ko'rsatish */}
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}

      {/* Create Student Button */}
      <Button type="primary" onClick={showModal} style={{ marginBottom: '20px' }}>
        Create Student
      </Button>

      {/* Studentlar ro'yxati */}
      <List
        itemLayout="horizontal"
        dataSource={students}
        renderItem={(student) => (
          <List.Item
            actions={[
              <Button type="link" danger>
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={student.name}
              description={`${student.age} years old, ${student.address}`}
            />
          </List.Item>
        )}
      />

      {/* Create Student Modal */}
      <Modal
        title="Create Student"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Footerni olib tashlaymiz, biz o'zimizni footerni qo'shamiz
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onCreateStudent}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the student name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: 'Please input the student age!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input the student address!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Student
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Students;
