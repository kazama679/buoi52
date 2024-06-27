import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// hàm lấy thông tin tất cả các category
export const getAllCategory: any = createAsyncThunk(
    "category/getAllCategory",
    async () => {
        const response = await axios.get(" http://localhost:8080/category");
        return response.data;
    }
);

const categoryReducer = createSlice({
    name: "category",
    initialState: {
        category: [],
    },
    reducers: {
        // bên trong reducer sẽ chứa các action
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllCategory.fulfilled, (state, action) => {
            // trong trạng thái lấy dữ liệu thành công
            state.category = action.payload;
        })
    },
});
export default categoryReducer.reducer;