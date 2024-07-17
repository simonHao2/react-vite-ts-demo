import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './slice/count.slice';
import userReducer from './slice/user.slice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer
    }
});
//从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断出类型: {count: CountState,....等等}
export type AppDispatch = typeof store.dispatch;
export default store;