import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, addList, deleteList, getAllList, updateStatus } from '../store/reducers/BaitapReducer';
import { getAllCategory } from '../store/reducers/categoryReducer';

export default function Home() {
    const [statusWeb, setStatusWeb] = useState<boolean>(true);
    const [statusThongBao, setStatusThongBao] = useState<boolean>(false);
    const [statusCanhbao, setStatusCanhbao] = useState<boolean>(false);
    const [selectedLesson, setSelectedLesson] = useState<List | null>(null);

    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [category, setCategory] = useState<string>('Lập trình web');
    const [content, setContent] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('null');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(5);

    const handleWeb1 = () => {
        setStatusWeb(true);
    }
    const handleWeb2 = () => {
        setStatusWeb(false);
    }
    const huyXacNhan = () => {
        setStatusThongBao(false);
        setSelectedLesson(null);
    }
    const xacNhan = () => {
        if (selectedLesson) {
            let newStatus = { ...selectedLesson, status: !selectedLesson.status };
            disPatch(updateStatus(newStatus));
        }
        setStatusThongBao(false);
        setSelectedLesson(null);
    }
    const huyCanhbao = () => {
        setStatusCanhbao(false);
    }

    const data: any = useSelector(state => state);
    const disPatch = useDispatch();
    useEffect(() => {
        disPatch(getAllList());
        disPatch(getAllCategory());
    }, [disPatch]);

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.value);
    }
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    }
    const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const onclickSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (name === '' || image === '' || content === '') {
            setStatusCanhbao(true);
        } else {
            const newList: List = {
                id: Math.floor(Math.random() * 99999999),
                title: name,
                thumbnail: image,
                content: content,
                updateAt: "27/06/2024",
                status: true,
                category: category
            }
            disPatch(addList(newList));
            setName('');
            setImage('');
            setContent('');
            setCategory('Lập trình web');
            setStatusWeb(true);
        }
    }

    function deleteLesson(id: any) {
        disPatch(deleteList(id));
    }

    const handleUpdate = (lesson: any) => {
        setSelectedLesson(lesson);
        setStatusThongBao(true);
    }

    function handleChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setSortOrder(e.target.value);
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    const handleRecordsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRecordsPerPage(Number(e.target.value));
        setCurrentPage(1);
    }

    const sortedLessons = data.BaitapReducer.lessons
        .filter((lesson: any) => lesson.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a: any, b: any) => {
            if (sortOrder === 'true') {
                return a.title.localeCompare(b.title);
            } else if (sortOrder === 'false') {
                return b.title.localeCompare(a.title);
            }
            return 0;
        });

    const totalRecords = sortedLessons.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const currentPageData = sortedLessons.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    }

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    }

    const goToPage = (page: number) => {
        setCurrentPage(page);
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
                        <select className='selectSapXep' onChange={handleChangeSelect} name="" id="">
                            <option value="null">Không sắp xếp</option>
                            <option value="true">Từ A - Z</option>
                            <option value="false">Từ Z - A</option>
                        </select>
                        <label htmlFor="">Tìm kiếm bài viết theo tên</label>
                        <input onChange={handleChangeInput} type="text" />
                        <div className='formasStyle'></div>
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
                                {currentPageData.map((post: any, index: number) => (
                                    <tr key={post.id}>
                                        <td>{index + 1 + (currentPage - 1) * recordsPerPage}</td>
                                        <td>{post.title}</td>
                                        <td><img src={post.thumbnail} className="post-image" alt="thumbnail" /></td>
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
                        <div className='banGhiAll'>
                            <div>Số lượng: {totalRecords} bản ghi</div>
                            <div className='banGhi'>
                                <label htmlFor="">Số bản ghi trên mỗi trang</label>
                                <select onChange={handleRecordsPerPageChange} value={recordsPerPage}>
                                    <option value="5">5 bản ghi</option>
                                    <option value="10">10 bản ghi</option>
                                    <option value="15">15 bản ghi</option>
                                    <option value="20">20 bản ghi</option>
                                </select>
                                <div onClick={goToPreviousPage} className='page-nav'>Trước</div>
                                {[...Array(totalPages)].map((_, index) => (
                                    <div
                                        key={index}
                                        onClick={() => goToPage(index + 1)}
                                        className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                                    >
                                        {index + 1}
                                    </div>
                                ))}
                                <div onClick={goToNextPage} className='page-nav'>Sau</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="add-post">
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Tên bài viết</label>
                                <input
                                    onChange={changeName}
                                    type="text"
                                    id="title"
                                    value={name}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Hình ảnh</label>
                                <input
                                    type="text"
                                    id="image"
                                    onChange={changeImage}
                                    value={image}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Thể loại</label>
                                <select onChange={handleSelect} name="" id="" value={category}>
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
                                    value={content}
                                ></textarea>
                            </div>
                            <button type="submit" onClick={onclickSave} className="submit-button">Xuất bản</button>
                        </form>
                    </div>
                )}
            </div>
            {statusCanhbao ? (
                <div className="modal">
                    <div className="modal-header">
                        <span className="title">Cảnh báo</span>
                        <span onClick={huyCanhbao} className="close-button">&times;</span>
                    </div>
                    <div className="modal-content">
                        <p><span className="warning-icon">&#9888;</span> Tên bài viết không được để trống</p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={huyCanhbao} className="cancel-button">Hủy</button>
                    </div>
                </div>
            ) : null}
            {statusThongBao ? (
                <div className="modal">
                    <div className="modal-header">
                        <span className="title">Xác nhận</span>
                        <span onClick={huyXacNhan} className="close-button">&times;</span>
                    </div>
                    <div className="modal-content">
                        <p><span className="warning-icon">&#9888;</span> Bạn có chắc chắn muốn thay đổi trạng thái bài viết?</p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={huyXacNhan} className="cancel-button">Hủy</button>
                        <button onClick={xacNhan} className="confirm-button">Xác nhận</button>
                    </div>
                </div>
            ) : null}
        </>
    )
}
