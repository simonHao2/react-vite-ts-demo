import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface CounterState {
    value: number,
}
const initialState: CounterState = {
    value: 0
}
//在某些情况下，TypeScript 可能会对初始 state 进行不必要的类型收束. 
//如果发生这种情况，你可以通过使用 as 转换初始 state 来解决它，而不是声明变量的类型：
// 解决方法：强制转换 state 而不是声明变量类型
// const initialState = {
//     value: 0
// } as CounterState

const counterSlice = createSlice({
    name: "counter",
    //`createSlice` 将从 `initialState` 参数推断 state 类型
    initialState,
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        // 使用 PayloadAction 类型声明 `action.payload` 的内容
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    },
    // extraReducers: (builder) => {
    // },
});
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectCount = (state: RootState) => state.counter.value
export default counterSlice.reducer;