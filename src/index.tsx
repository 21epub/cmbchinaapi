import React, { useState, useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { Provider, useStore, useSelector, useDispatch } from "react-redux";
const $ = require('jQuery');

import './css/style.module.scss'
import store from './store/store';
import ApiListPanel from './panel/ApiListPanel';
import ApiSettingPanel from './panel/ApiSettingPanel';
import * as api from './config/api';

const ApiPanel = (props: any) => {
    const state = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [panelNumber, setPanelNumberl] = useState(0);  //设置显示的面板，0代表都不显示，1代表显示api选择列表，2代表显示api配置面板

    // 事件绑定
    useEffect(() => {
        api.QueryApiList(':userId').then((res: any) => {
            console.log("api列表", res);
            dispatch({ type: 'ApiList', value: res }); //更新数据
            // setPanelNumberl(1);
        }).catch((error: any) => {
            console.log(error);
            // console.log(error.response.data);
        })
        api.QueryApiDetail(':userId',':appId').then((res: any) => {
            console.log("api详情", res);
            dispatch({ type: 'ApiDetail', value: res }); //更新数据
            setPanelNumberl(2);
        }).catch((error: any) => {
            console.log(error.response.data);
        })
        api.apiData(':userId',':appId',{key:'value'}).then((res: any) => {
            console.log("api数据", res);
            dispatch({ type: 'ApiData', value: res }); //更新数据
            // setPanelNumberl(1);
        }).catch((error: any) => {
            console.log(error.response.data);
        })
    }, [])

    const ShowPage = () => {
        switch (panelNumber) {
            case 1: return <ApiListPanel />;
            case 2: return <ApiSettingPanel />;
            default: return null;
        }
    }

    return ShowPage();
}



// 初始化panel
// const initialize = () => {
$('body').append('<div id="apiPanel"></div>');
// $('body').append('<div id="apiPanel" style="display:none"></div>');
ReactDOM.render(
    <Provider store={store}>
        <ApiPanel />
    </Provider>,
    document.getElementById("apiPanel")
);
// }


// export {
//     initialize
// }