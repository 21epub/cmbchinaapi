import axios from 'axios';



// 配置默认请求头
axios.defaults.headers = {
    'Content-type': 'application/x-www-form-urlencoded'
}
// application/x-www-form-urlencoded
// multipart/form-data
// application/json


// 配置接口Url
const portal_url = '/';


// **-------------------------------------------------------------------------------------------助力活动接口'api/assistance/'

// 查询招行api接口列表
const QueryApiList = (userId: any) => {
    return new Promise((resolve, reject) => {
        axios.get('http://rap2.epub360.com:38080/app/mock/27' + '/api/' + userId + '/apis')
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}


// 查询api接口详情
const QueryApiDetail = (userId: any, apiId: any) => {
    return new Promise((resolve, reject) => {
        axios.get('http://rap2.epub360.com:38080/app/mock/27' + '/api/' + userId + '/apis/' + apiId)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

// 通过接口查询相关数据
const apiData = (userId: any, apiId: any,params:any) => {
    return new Promise((resolve, reject) => {
        axios.post('http://rap2.epub360.com:38080/app/mock/27' + '/api/' + userId + '/apis/' + apiId + '/invoke', JSON.stringify({
            name: params.name,
            in: params.in,
            value: params.value
        }),
            { headers: { 'Content-type': 'application/json;charset=utf-8' } }).then((response: any) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
    });
}

export {
    QueryApiList,
    QueryApiDetail,
    apiData
}