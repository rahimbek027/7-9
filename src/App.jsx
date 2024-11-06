import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Students from './pages/Students';
import Home from './pages/Home';
import About from './pages/About';

const { Header, Content, Footer } = Layout;

const App = () => (
  <Layout>
    <Header>
      <Navbar />
    </Header>
    <Content style={{ padding: '20px 50px' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/students" element={<Students />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Student App ©2024 Created by Your Name</Footer>
  </Layout>
);

export default App;
