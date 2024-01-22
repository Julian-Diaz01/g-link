import React, { SetStateAction, useState } from 'react';
import { HomeTwoTone, EditTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const Header: React.FC = () => {
    const [current, setCurrent] = useState<string>('h');

    const onClick = (e: { key: SetStateAction<string> }) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="h" icon={<HomeTwoTone />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="r" icon={<EditTwoTone />} style={{ marginLeft: 'auto' }}>
                    <Link to="/register">Register</Link>
                </Menu.Item>
                <Menu.Item key="l" icon={<CheckCircleTwoTone />}>
                    <Link to="/login">Login</Link>
                </Menu.Item>
            </Menu>
            <Outlet />
        </>
    );
};
export default Header;
