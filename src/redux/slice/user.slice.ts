import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";
import { RootState } from "../store";

interface UserState {
    users: Array<User>;
    usersToal: number;
    loading: boolean;
    error: string;
}
const initialState: UserState = {
    users: [],
    usersToal: 0,
    loading: false,
    error: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserList: (state) => {
            state.loading = true;
        },
        getUserListSuccess: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.loading = false;
        },
        getUserListFail: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});
//Actions 
// export const userActions = {
//     getUserList: createAction(`${userSlice.name}`),
//     getUserListIsLoading: userSlice.actions.getUserList,
//     getUserListSuccess: userSlice.actions.getUserListSuccess,
//     getUserListFail: userSlice.actions
// }
//Selectors
export const selectUsers = (state: RootState): User[] => state.user.users;

export const { getUserList, getUserListSuccess, getUserListFail } = userSlice.actions;
export default userSlice.reducer;