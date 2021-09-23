import React from "react";
import { Avatar, Button, Menu, Typography } from "antd";
import { Link } from "react-router-dom";
import icon from "../images/cryptoImg.png";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
        />
        <Typography.Title level={2} className="logo">
          <Link to="/">Crypto App</Link>
        </Typography.Title>
      </div>
      <Menu theme="dark">
        <Menu.Item key={1} icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key={2} icon={<FundOutlined />}>
          <Link to="/cryptoCurriences">CryptoCurriences</Link>
        </Menu.Item>
        <Menu.Item key={3} icon={<MoneyCollectOutlined />}>
          <Link to="/exchanges">Exchanges</Link>
        </Menu.Item>
        <Menu.Item key={5} icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
