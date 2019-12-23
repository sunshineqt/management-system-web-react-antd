
export const init = (payload) => ({
    type:'init',
    payload
})

export const add = (payload) => ({
    type:'add',
    payload
})

export const loadingStart = () => ({
    type:'loading_start'
})

export const loadingEnd = () => ({
    type:'loading_end'
})

// 异步操作 借助中间件redux-thunk支持异步
export const asyncFetch = payload => {
    return dispatch => {
        dispatch({type:'loading_start'});
        setTimeout(() => {
            dispatch({type:'loading_end'});
            dispatch({type:'init', payload:['草莓', '香蕉']})
        }, 1000)
    }
}

export default function fruitReducer(state={
    list:[],
    loading:false
}, action){
    switch(action.type){
        case 'init':
            return { ...state, list:action.payload};
        case 'add':
            return { ...state, list:[...state.list, action.payload]};
        case 'loading_start':
            return { ...state, loading:true};
        case 'loading_end':
            return { ...state, loading:false};
        default:
            return state;                
    }
}