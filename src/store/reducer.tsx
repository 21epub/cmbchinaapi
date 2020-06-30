
const reducer = (state:any, action:any) => {

    switch (action.type) {
        case 'ApiList':      //用于保存api列表
            return Object.assign({}, state, {
                ApiList: action.value
            });
        case 'ApiDetail':    //保存当前api详细信息
            return Object.assign({}, state, {
                ApiDetail: action.value
            });
        case 'ApiData':        //post请求的数据
            return Object.assign({}, state, {
                ApiData: action.value
            });
        default: return state;
    }
};

export default reducer;