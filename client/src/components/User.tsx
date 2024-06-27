import { useDispatch, useSelector } from "react-redux"
import { getAllUser, deleteUser, addUser, updateUser } from "../store/reducers/userReducer"
import { useEffect } from "react";
export default function User() {

    // lấy data về dùng useSelector
    const data: any = useSelector(state => state);
    const disPatch = useDispatch();
    useEffect(() => {
        disPatch(getAllUser());
    }, []);

    const handleDeleteUser = (id: number) => {
        // console.log("giá trị id của user",id);
        // let confirmDelete = window.confirm("bạn có muốn xóa hay không");
        disPatch(deleteUser(id));
    }

    // hàm thêm mới user
    const addNewUser = () => {
        let newUser = {
            name: "mạnh"
        }
        disPatch(addUser(newUser))
    }
    
    // hàm cập nhật user
    const handleUpdateUser = (user: any) => {
        let newUser = { ...user, name: "minh thu" }
        disPatch(updateUser(newUser))
    }
    return (
        <div>Danh sach user
            <button onClick={addNewUser}>thêm user</button>
            <ul>
                {data.userReducer.users.map((user: any) => {
                    return <li key={user.id}>{user.name}
                        <button onClick={() => handleDeleteUser(user.id)}> xoa</button>
                        <button onClick={() => handleUpdateUser(user)}>cập nhật</button>
                    </li>
                })}
            </ul>
        </div>
    )
}   