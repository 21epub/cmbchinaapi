import React, { useState, useEffect } from 'react';
import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';

import { useSelector, useDispatch } from "react-redux";


// 列表
const ApiTable = (props: any) => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);   //获取保存的状态
  const [tableData, setTableData] = useState(state.ApiList.data.data);    //获取目标列表


  // 配置表格头，需要key值
  const columns: any = [
    {
      title: '序号',
      dataIndex: 'key',
      align:'center',
      width:'80px'
    },
    {
      title: 'ID',
      dataIndex: 'appId',
      align:'center'
    },
    {
      title: '标题',
      dataIndex: 'name',
      align:'center'
    },
    {
      title: '接口',
      dataIndex: 'path',
      align:'center'
    },
    {
      title: '方法',
      dataIndex: 'method',
      align:'center',
      width:'100px'
    },
    {
      title: '状态',
      dataIndex: 'status',
      align:'center',
      width:'80px'
    },
    {
      title: '操作',
      align:'center',
      width:'80px',
      render: (text: any, record: any) => (
        <Space size="middle">
          <a onClick={() => onInsert(text)}>插入</a>
        </Space>
      ),
    },
  ];

  // 表格组件需求的数据格式
  // const Data: any = [
  //   {
  //     "key": '1',
  //     "appId": 'appid1',
  //     "name": '招行接口1',
  //     "path": '/api/appid',
  //     "method": 'GET',
  //     "status": '正常'
  //   },
  //   {
  //     "key": '1',
  //     "appId": 'appid1',
  //     "name": '招行接口1',
  //     "path": '/api/appid',
  //     "method": 'GET',
  //     "status": '正常'
  //   },
  //   {
  //     "key": '1',
  //     "appId": 'appid1',
  //     "name": '招行接口1',
  //     "path": '/api/appid',
  //     "method": 'GET',
  //     "status": '正常'
  //   },
  //   {
  //     "key": '1',
  //     "appId": 'appid1',
  //     "name": '招行接口1',
  //     "path": '/api/appid',
  //     "method": 'GET',
  //     "status": '正常'
  //   }
  // ];


  const onInsert = (value:any) => {
    console.log('插入',value);
  }


  return (
    <>
      <Table 
        columns={columns} 
        dataSource={tableData} 
        bordered
        scroll={{y:300}}
      />
    </>
  )
}


export default ApiTable
