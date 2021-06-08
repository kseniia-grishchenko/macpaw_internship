import React from 'react';
import './index.css';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';

export const SideMenu = ({sidebarClassname, mainClassname, componentName}) => {
    const showSidebar = () => {
        sidebarClassname('sidebar-hidden');
        mainClassname('main-hidden');
    }

    const hideSidebar = () => {
        sidebarClassname('sidebar-content');
        mainClassname('main');
    }

    return(
        <div id='side-menu'>
            {componentName === 'sidebar' ?
                <MenuFoldOutlined  onClick={hideSidebar} style={{color: '#FF868E', fontSize: '2rem'}}/> :
                <MenuUnfoldOutlined onClick={showSidebar} style={{color: '#FF868E', fontSize: '2rem'}}/>

            }
        </div>
    )
}