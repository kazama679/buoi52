import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, addList, deleteList, getAllList, updateStatus } from '../store/reducers/BaitapReducer'
import { getAllCategory } from '../store/reducers/categoryReducer'

export default function Home() {
    const [statusWeb, setStatusWeb] = useState<boolean>(true)
    const [statusThongBao, setStatusThongBao] = useState<boolean>(false)
    const [statusCanhbao, setStatusCanhbao] = useState<boolean>(false)

    const [name, setName] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [category, setCategory] = useState<string>('Lập trình web')
    const [content, setContent] = useState<string>('')
    const [sortOrder, setSortOrder] = useState<string>('abc'); 
    const [searchQuery, setSearchQuery] = useState<string>(''); 
    
    const handleWeb1 = () => {
        setStatusWeb(!statusWeb);
    }
    const handleWeb2 = () => {
        setStatusWeb(!statusWeb);
    }
    const huyXacNhan = () => {
        setStatusThongBao(false)
    }
    const xacNhan = () => {
        setStatusThongBao(false)
    }
    const huyCanhbao = () => {
        setStatusCanhbao(false)
    }

    // lấy data về dùng useSelector
    const data: any = useSelector(state => state);
    console.log(1111111, data);
    const disPatch = useDispatch();
    useEffect(() => {
        disPatch(getAllList());
        disPatch(getAllCategory());
    }, []);

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.value)
    }
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value)
    }
    const changeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value)
    }
    // hàm thêm mới user
    const onclickSave = (e: React.FormEvent) => {
        e.preventDefault();
        const newList: List = {
            id: Math.floor(Math.random() * 99999999),
            title: name,
            thumbnail: image,
            content: content,
            updateAt: "27/06/2024",
            status: true,
            category: category
        }
        disPatch(addList(newList))
        if (name === '' || image === '' || content === '') {
            setStatusCanhbao(true);
        } else {
            setName('')
            setImage('')
            setContent('')
            setCategory('Lập trình web')
            setStatusWeb(!statusWeb)
        }
    }
    function deleteLesson(id: any) {
        disPatch(deleteList(id));
    }
    // hàm cập nhật 
    const handleUpdate = (lesson: any) => {
        let newStatus = { ...lesson, status: !lesson.status }
        disPatch(updateStatus(newStatus))
    }

    //sắp xếp 
    const handleChangeSelect=()=>{

    }

    // tìm kiếm
    const handleChangeInput=()=>{

    }
    return (
        <>
            <div className="post-list">
                <div className="post-list2">
                    <h2 onClick={handleWeb1} style={{ color: `${statusWeb ? "blue" : "black"}` }}>Danh sách bài viết</h2>
                    <h2 onClick={handleWeb2} style={{ color: `${statusWeb ? "black" : "blue"}` }}>Thêm mới bài viết</h2>
                </div>
                {statusWeb ? (
                    <>
                        <label htmlFor="">Sắp xếp theo tên</label>
                        <select onChange={handleChangeSelect} name="" id="">
                            <option value="abc">từ A - Z</option>
                            <option value="xyz">từ Z - A</option>
                        </select>
                        <label htmlFor="">Tìm kiếm bài viết theo tên</label>
                        <input onChange={handleChangeInput} type="text" />
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tiêu đề</th>
                                    <th>Hình ảnh</th>
                                    <th>Thể loại</th>
                                    <th>Ngày viết</th>
                                    <th>Trạng thái</th>
                                    <th>Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.BaitapReducer.lessons.map((post: any) => (
                                    <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td><img src={post.thumbnail} className="post-image" /></td>
                                        <td>{post.category}</td>
                                        <td>{post.updateAt}</td>
                                        <td>{post.status ? "Đã xuất bản" : "Chưa xuất bản"}</td>
                                        <td>
                                            <button onClick={() => handleUpdate(post)} style={{ backgroundColor: `${post.status ? "green" : "black"}` }} className="edit-button">Thay đổi trạng thái</button>
                                            <button onClick={() => deleteLesson(post.id)} className="delete-button">Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (<div className="add-post">
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Tên bài viết</label>
                            <input
                                onChange={changeName}
                                type="text"
                                id="title"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Hình ảnh</label>
                            <input
                                type="text"
                                id="image"
                                onChange={changeImage}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Thể loại</label>
                            <select onChange={handleSelect} name="" id="">
                                {data.getAllCategory.category.map((item: any) => {
                                    return <option key={item.id} value={item.category}>{item.category}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Nội dung</label>
                            <textarea
                                id="content"
                                onChange={changeContent}
                            ></textarea>
                        </div>
                        <button type="submit" onClick={onclickSave} className="submit-button">Xuất bản</button>
                    </form>
                </div>
                )}
            </div>
            {/* cảnh báo*/}
            {statusCanhbao ? (<div className="modal">
                <div className="modal-header">
                    <span className="title">Cảnh báo</span>
                    <span onClick={huyCanhbao} className="close-button">&times;</span>
                </div>
                <div className="modal-content">
                    <p><span className="warning-icon">&#9888;</span>Tên bài viết không được để trống</p>
                </div>
                <div className="modal-footer">
                    <button onClick={huyCanhbao} className="cancel-button">Hủy</button>
                </div>
            </div>) : <></>}
            {/* thông báo ngừng bài viết*/}
            {statusThongBao ? (<div className="modal">
                <div className="modal-header">
                    <span className="title">Xác nhận</span>
                    <span onClick={huyXacNhan} className="close-button">&times;</span>
                </div>
                <div className="modal-content">
                    <p><span className="warning-icon">&#9888;</span> Bạn có chắc chắn muốn ngừng xuất bản bài viết?</p>
                </div>
                <div className="modal-footer">
                    <button onClick={huyXacNhan} className="cancel-button">Hủy</button>
                    <button onClick={xacNhan} className="confirm-button">Xác nhận</button>
                </div>
            </div>) : <></>}
        </>
    )
}