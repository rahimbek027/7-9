import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Button, Form, Input, Modal, List, message } from 'antd';
import { fetchStudents, addStudent, deleteStudent } from '../api/students';

const Students = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery('students', fetchStudents);

  const addMutation = useMutation(addStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries('students');
      message.success('Student added successfully');
      setIsModalVisible(false); // Modalni yopish
    },
  });

  const deleteMutation = useMutation(deleteStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries('students');
      message.success('Student deleted successfully');
    },
  });

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal holati

  const onFinish = (values) => {
    // Student qo'shish
    addMutation.mutate(values);
    form.resetFields();
  };

  const showModal = () => {
    setIsModalVisible(true); // Modalni ko'rsatish
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Modalni yopish
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="fullscreen-container"> {/* Butun ekran to'ldiruvchi konteyner */}
      <h2>Student List</h2>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 20 }}>
        Create Student
      </Button>

      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(student) => (
          <List.Item
            actions={[
              <Button type="link" danger onClick={() => deleteMutation.mutate(student.id)}>
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta title={student.name} description={`${student.age} years old, ${student.address}`} />
          </List.Item>
        )}
      />

      {/* Student qo'shish uchun modal */}
      <Modal
        title="Create Student"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="100%"  // Modalni to'liq kenglikka moslashtirish
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter student name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: 'Please enter student age' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please enter student address' }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Add Student
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Students;
