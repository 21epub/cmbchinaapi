import React, { useState, useEffect } from 'react';

// 导入antd相关组件及样式
import { Layout, Tabs, Button } from 'antd';
const { Header, Content } = Layout;
import { SettingFilled, CloseOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import ApiTable from '../components/ApiTable';


// 配置面板
const ApiListPanel = (props: any) => {


  const onClose = () => {
    // 关闭页面
    // props.panel(0);
    var apiPanel = document.getElementById('apiPanel');
    apiPanel.style.cssText = "display:none;";
  }

  return (
    <>
      <div id='apiListPanel' className='apiListPanel'>
        {/* 上方标题部分 */}
        <Header>
          <div>
            选择Api
          </div>
          <div className="iconWidget">
            <CloseOutlined onClick={() => { onClose() }} />
          </div>
        </Header>
        <Content>
          <ApiTable/>
        </Content>
      </div>
    </>
  )
}


export default ApiListPanel;
