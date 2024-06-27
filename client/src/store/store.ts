import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import BaitapReducer from "./reducers/BaitapReducer";
import getAllCategory from "./reducers/categoryReducer";
// đi tạo kho 
const store = configureStore({
    reducer: {
        userReducer,
        BaitapReducer,
        getAllCategory,
    },
});
// xuất kho 
export default store;