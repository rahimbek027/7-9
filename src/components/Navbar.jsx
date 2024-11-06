import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <Menu mode="horizontal" theme="dark">
    <Menu.Item key="home">
      <Link to="/">Home</Link>
    </Menu.Item>
    <Menu.Item key="students">
      <Link to="/students">Students</Link>
    </Menu.Item>
    <Menu.Item key="about">
      <Link to="/about">About</Link>
    </Menu.Item>
  </Menu>
);

export default Navbar;
