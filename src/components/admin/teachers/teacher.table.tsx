'use client'
import Table from 'react-bootstrap/Table';
import Link from 'next/link'
import Button from 'react-bootstrap/Button';
import CreateTeacher from '@/components/admin/teachers/teacher.create';
import UpdateTeacher from '@/components/admin/teachers/teacher.update';
import { useState } from "react";
import { toast } from 'react-toastify';
import { mutate } from "swr"
import { TEACHERS_API_URL } from '@/constants';

interface IProps {
    teachers: ITeacher[];
    showModalCreate: boolean;
    setShowModalCreate: (v: boolean) => void;
}

function TeacherTable(progs: IProps) {
    const { teachers, showModalCreate, setShowModalCreate } = progs;
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [teacher, setTeacher] = useState<ITeacher | null>(null);

    const handleDeteleBtn = (id: string) => {
        if (confirm(`Bạn có chắc muốn xóa giảng viên ${id}`)) {
            fetch(`${TEACHERS_API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then(res => {
                    if (res) {
                        toast.warning("Xóa giảng viên thành công!");
                        mutate(TEACHERS_API_URL);
                    } else {
                        toast.error("Xóa giảng viên thất bại!");
                    }
                });
        }
    }

    return (
        
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã giảng viên</th>
                        <th>Họ lót</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(item => {
                        return (
                            <tr key={item.teacherID}>
                                <td>{item.teacherID}</td>
                                <td>{item.lastName}</td>
                                <td>{item.firstName}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNumber}</td>
                                <td>
                                    <Link href={`/admin/teachers/${item.teacherID}`} className='btn btn-info mx-1'>Chi tiết</Link>
                                    <Button variant='warning' className='mx-1'
                                        onClick={() => {
                                            setTeacher(item);
                                            setShowModalUpdate(true);
                                        }}
                                    >Cập nhật</Button>
                                    <Button variant='danger' className='mx-1'
                                        onClick={() => handleDeteleBtn(item.teacherID)}>Xóa</Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <CreateTeacher
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate}
            />
            <UpdateTeacher
                teacher={teacher}
                setTeacher={setTeacher}
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
            />
        </div>
    )
}

export default TeacherTable