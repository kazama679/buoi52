import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/// hàm lấy thông tin tất cả các user
export const getAllUser: any = createAsyncThunk(
    "users/getAllUser",
    async () => {
        let response = await axios.get(" http://localhost:8080/users");
        return response.data;
    }
);
// hàm xóa thông tin user
export const deleteUser: any = createAsyncThunk(
    "users/deleteUser",
    async (id: number) => {
        await axios.delete(` http://localhost:8080/users/${id}`);
        return id;
    }
);
// hàm thêm thông tin user vào trong bảng users
export const addUser: any = createAsyncThunk(
    "users/addUser",
    async (user: any) => {
        let response: any = await axios.post(
            "http://localhost:8080/users",
            user
        );
        return response.data;
    }
);
// hàm cập nhật thông tin của user
export const updateUser: any = createAsyncThunk(
    "users/updateUser",
    async (user: any) => {
        let response: any = await axios.put(
            `http://localhost:8080/users/${user.id}`,
            user
        );
        return response.data;
    }
);

const userReducer = createSlice({
    name: "user",
    initialState: {
        users: [],
    },
    reducers: {
        // bên trong reducer sẽ chứa các action
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.pending, (state, action) => {
                // trong trạng thái chờ call api
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                // trong trạng thái lấy dữ liệu thành công
                state.users = action.payload;
            })
            .addCase(getAllUser.rejected, (state, action) => {
                // nếu lấy dữ liệu thất bại
            })
            .addCase(addUser.fulfilled, (state: any, action: any) => {
                state.users.push(action.payload);
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user: any) => {
                    return user.id != action.payload;
                });
            })
            .addCase(updateUser.fulfilled, (state: any, action) => {
                let index = state.users.findIndex((user: any) => {
                    return user.id === action.payload.id;
                });
                if (index != -1) {
                    state.users[index] = action.payload;
                }
            });
    },
});
export default userReducer.reducer;