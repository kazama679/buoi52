import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface List {
    id: number,
    title: string,
    thumbnail: string,
    content: string,
    createdAt: string,
    updateAt: string,
    status:boolean,
    category:string
}
// hàm lấy thông tin tất cả các lesson
export const getAllList: any = createAsyncThunk(
    "lessons/getAllList",
    async () => {
        const response = await axios.get(" http://localhost:8080/lessons");
        return response.data;
    }
);

// hàm thêm thông tin lesson vào trong bảng lessons
export const addList: any = createAsyncThunk(
    "lessons/addList",
    async (lesson: any) => {
        const response: any = await axios.post(
            "http://localhost:8080/lessons", 
            lesson
        );
        return response.data;
    }
);

// hàm xóa
export const deleteList: any = createAsyncThunk(
    "lessons/deleteList",
    async (id: number) => {
        await axios.delete(` http://localhost:8080/lessons/${id}`);
        return id;
    }
);
// hàm cập nhật status
export const updateStatus: any = createAsyncThunk(
    "lessons/updateStatus",
    async (lesson: any) => {
        const response: any = await axios.put(
            `http://localhost:8080/lessons/${lesson.id}`,
            lesson
        );
        return response.data;
    }
);

const BaitapReducer = createSlice({
    name: "lessons",
    initialState: {
        lessons: [],
    },
    reducers: {
        // bên trong reducer sẽ chứa các action
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllList.fulfilled, (state, action) => {
            // trong trạng thái lấy dữ liệu thành công
            state.lessons = action.payload;
        })
        .addCase(addList.fulfilled, (state: any, action: any) => {
            state.lessons.push(action.payload);
        })

        .addCase(deleteList.fulfilled, (state, action) => {
            state.lessons = state.lessons.filter((user: any) => {
                return user.id != action.payload;
            });
        })

        .addCase(updateStatus.fulfilled, (state: any, action) => {
            let index: any = state.lessons.findIndex((lesson: any) => {
                return lesson.id === action.payload.id;
            });
            if (index !== -1) {
                state.lessons[index] = action.payload;
            }
        });
    },
});
export default BaitapReducer.reducer;