import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import fruitReducer from './fruit.redux';
import user from './user.redux';

import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas';

// 1.创建saga中间件并注册
const sagaMiddleware = createSagaMiddleware()

// createStore参数二是中间件函数
const store = createStore(
    combineReducers({ fruit: fruitReducer, user }),
    applyMiddleware(logger, thunk, sagaMiddleware)
)

// 执行任务清单，监听
sagaMiddleware.run(mySaga);

export default store;