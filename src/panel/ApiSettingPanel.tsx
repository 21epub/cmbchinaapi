import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

// 导入antd相关组件及样式
import { Layout, Collapse, Row, Col, Input, Select, Menu } from 'antd';
const { Panel } = Collapse;
const { SubMenu } = Menu;
const { Option } = Select;
const { Header, Content } = Layout;
import { SettingFilled, CloseOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';



// api配置面板
const ApiSettingPanel = (props: any) => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);   //获取保存的状态
  const [response, setResponse] = useState(state.ApiDetail.data.response);    //返回参数
  let count: number = 0;

  const onClose = () => {
    // 关闭页面
    var apiPanel = document.getElementById('apiPanel');
    apiPanel.style.cssText = "display:none;";
  }


  const callback = (key: any) => {
    console.log(key);
  }

  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  }


  const BackParamsCollapse = (value: any) => {
    let margin = 20 * count;
    count = count + 1;
    return (
      Object.keys(value).map((key: any, index: any) => {
        if (value[key].children && value[key].type == 'Object') {
          return (
            <Collapse defaultActiveKey={['1']} ghost key={index} style={{ marginLeft: margin }} >
              <Panel header={
                <Row justify='end' align='middle' >
                  <Col span={7} >
                    <Input defaultValue={key} style={{ 'width': '120px' }} />
                  </Col>
                  <Col span={4} >
                    <Select defaultValue={value[key].type} style={{ width: 80 }} onChange={handleChange}>
                      <Option value="String">字符</Option>
                      <Option value="Integer">整型</Option>
                      <Option value="Array">数组</Option>
                      <Option value="Object">对象</Option>
                      <Option value="Float">浮点</Option>
                    </Select>
                  </Col>
                  <Col span={13} >
                    <Input defaultValue={value[key].description} style={{ 'width': 290 - margin }} />
                  </Col>
                </Row>
              } key="1" >
                {
                  value[key].type == 'Object' ? BackParamsCollapse(value[key].children) : null
                }
              </Panel>
            </Collapse>
          )
        } else if (value[key].children && value[key].type == 'Array') {
          return (
            <Collapse defaultActiveKey={['1']} ghost key={index} style={{ marginLeft: margin }} >
              <Panel header={
                <Row justify='end' align='middle' >
                  <Col span={7} >
                    <Input defaultValue={key} style={{ 'width': '120px' }} />
                  </Col>
                  <Col span={4} >
                    <Select defaultValue={value[key].type} style={{ width: 80 }} onChange={handleChange}>
                      <Option value="String">字符</Option>
                      <Option value="Integer">整型</Option>
                      <Option value="Array">数组</Option>
                      <Option value="Object">对象</Option>
                      <Option value="Float">浮点</Option>
                    </Select>
                  </Col>
                  <Col span={13} >
                    <Input defaultValue={value[key].description} style={{ 'width': 290 - margin }} />
                  </Col>
                </Row>
              } key="1" >
                {
                  value[key].children.map((item: any, index: any) => {
                    return (
                      <Collapse defaultActiveKey={['1']} ghost key={index} style={{ marginLeft: margin - 20 }} >
                        <Panel header={index} key="1" >
                          {
                            value[key].children.map((items: any, index: any) => {
                              return BackParamsCollapse(items)
                            })
                          }
                        </Panel>
                      </Collapse>
                    )
                  })
                }
              </Panel>
            </Collapse>
          )
        } else {
          return (
            <Row justify='end' align='middle' key={index} style={{ marginLeft: margin }}>
              <Col span={7} >
                <Input defaultValue={key} style={{ 'width': '120px' }} />
              </Col>
              <Col span={4} >
                <Select defaultValue={value[key].type} style={{ width: 80 }} onChange={handleChange}>
                  <Option value="String">字符</Option>
                  <Option value="Integer">整型</Option>
                  <Option value="Array">数组</Option>
                  <Option value="Object">对象</Option>
                  <Option value="Float">浮点</Option>
                </Select>
              </Col>
              <Col span={13} >
                <Input defaultValue={value[key].description} style={{ 'width': 290 - margin }} />
              </Col>
            </Row>
          )
        }
      })
    )
  }

  const ArrayData = () => {

  }

  return (
    <>
      <div id='apiSettingPanel' className='apiSettingPanel'>
        {/* 上方标题部分 */}
        <Header>
          <div>
            <SettingFilled style={{ margin: '0px 10px' }} />  Api配置
          </div>
          <div className="iconWidget">
            <CloseOutlined onClick={() => { onClose() }} />
          </div>
        </Header>
        {/* 中间内容部分 */}
        <Content>
          {/* api基本信息 */}
          <Row justify='end' align='middle' >
            <Col span={10} >
              <span> API ID </span>
              <Input defaultValue={state.ApiDetail.data.appId} />
            </Col>
            <Col span={14} >
              <span> API 名称 </span>
              <Input defaultValue={state.ApiDetail.data.name} style={{ 'width': '240px' }} />
            </Col>
          </Row>
          <Row justify='end' align='middle'>
            <Col span={10} >
              <span> 协议 </span>
              <Select defaultValue={state.ApiDetail.data.schemas} style={{ width: 160 }} onChange={handleChange}>
                <Option value="http">HTTP</Option>
                <Option value="https">HTTPS</Option>
              </Select>
            </Col>
            <Col span={14} >
              <span> 请求方法 </span>
              <Select defaultValue={state.ApiDetail.data.method} style={{ width: 240 }} onChange={handleChange}>
                <Option value="get">GET</Option>
                <Option value="post">POST</Option>
                <Option value="put">PUT</Option>
                <Option value="delete">DELETE</Option>
                <Option value="patch">PATCH</Option>
              </Select>
            </Col>
          </Row>
          <Row justify='end' align='middle' >
            <Col span={24} >
              <span> 服务器 </span>
              <Input defaultValue={state.ApiDetail.data.host} style={{ 'width': '480px' }} />
            </Col>
          </Row>
          <Row justify='end' align='middle' >
            <Col span={24} >
              <span> API路径 </span>
              <Input defaultValue={state.ApiDetail.data.path} style={{ 'width': '480px' }} />
            </Col>
          </Row>

          <Collapse defaultActiveKey={['3']} onChange={callback} >
            {/* api请求头信息 */}
            <Panel header="Header" key="1">
              <Row justify='end' align='middle' style={{ 'height': '20px', 'marginTop': '6px' }}>
                <Col span={10} style={{ 'textAlign': 'center' }}>
                  <span> 参数名 </span>
                </Col>
                <Col span={14} style={{ 'textAlign': 'center' }}>
                  <span> 值 </span>
                </Col>
              </Row>
              {
                state.ApiDetail.data.headers.map((item: any, index: any) => {
                  return (
                    <Row justify='end' align='middle' key={index}>
                      <Col span={10} >
                        <Input defaultValue={state.ApiDetail.data.headers[0].key} style={{ 'width': '200px' }} />
                      </Col>
                      <Col span={14} >
                        <Input defaultValue={state.ApiDetail.data.headers[0].value} style={{ 'width': '300px' }} />
                      </Col>
                    </Row>
                  )
                })
              }
            </Panel>
            {/* api请求参数信息 */}
            <Panel header="请求参数" key="2">
              <Row justify='end' align='middle' style={{ 'height': '20px', 'marginTop': '6px' }}>
                <Col span={5} style={{ 'textAlign': 'center' }}>
                  <span> 请求方式 </span>
                </Col>
                <Col span={5} style={{ 'textAlign': 'center' }}>
                  <span> 参数名 </span>
                </Col>
                <Col span={4} style={{ 'textAlign': 'center' }}>
                  <span> 类型 </span>
                </Col>
                <Col span={6} style={{ 'textAlign': 'center' }}>
                  <span> 默认值 </span>
                </Col>
                <Col span={4} style={{ 'textAlign': 'center' }}>
                  <span> 必填 </span>
                </Col>
              </Row>
              {
                state.ApiDetail.data.parameters.map((item: any, index: any) => {
                  return (
                    <Row justify='end' align='middle' key={index}>
                      <Col span={5} >
                        <Select defaultValue={item.in} style={{ width: 80 }} onChange={handleChange}>
                          <Option value="body">Body</Option>
                          <Option value="form">Form</Option>
                          <Option value="query">Query</Option>
                          <Option value="header">Header</Option>
                        </Select>
                      </Col>
                      <Col span={5} >
                        <Input defaultValue={item.name} style={{ 'width': '100px' }} />
                      </Col>
                      <Col span={4} >
                        <Select defaultValue={item.type} style={{ width: 80 }} onChange={handleChange}>
                          <Option value="String">字符</Option>
                          <Option value="Integer">整型</Option>
                          <Option value="Array">数组</Option>
                          <Option value="Object">对象</Option>
                          <Option value="Float">浮点</Option>
                        </Select>
                      </Col>
                      <Col span={6} >
                        <Input defaultValue={item.defaultValue} style={{ 'width': '120px' }} />
                      </Col>
                      <Col span={4} >
                        <Select defaultValue={(item.required).toString()} style={{ width: 80 }} onChange={handleChange}>
                          <Option value="true">是</Option>
                          <Option value="false">否</Option>
                        </Select>
                      </Col>
                    </Row>
                  )
                })
              }
            </Panel>
            {/* api返回参数信息 */}
            <Panel header="返回参数" key="3">
              <Row justify='end' align='middle' style={{ 'height': '20px', 'marginTop': '6px' }}>
                <Col span={7} style={{ 'textAlign': 'center' }}>
                  <span> 参数名 </span>
                </Col>
                <Col span={4} style={{ 'textAlign': 'center' }}>
                  <span> 类型 </span>
                </Col>
                <Col span={13} style={{ 'textAlign': 'center' }}>
                  <span> 说明 </span>
                </Col>
              </Row>
              {
                BackParamsCollapse(response.data)
              }
            </Panel>
          </Collapse>
        </Content>
      </div>
    </>
  )
}


export default ApiSettingPanel;
