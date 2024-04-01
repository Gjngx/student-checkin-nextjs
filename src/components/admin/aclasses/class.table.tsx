'use client'
import Table from 'react-bootstrap/Table';
import Link from 'next/link'
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { mutate } from "swr"
import { CLASS_API_URL } from '@/constants';
import CreateClass from '@/components/admin/aclasses/class.create'
import UpdateClass from '@/components/admin/aclasses/class.update'

interface IProps {
    classes: IClass[];
    showModalCreate: boolean;
    setShowModalCreate: (v: boolean) => void;
}

function ClassTable(progs: IProps) {
    const { classes, showModalCreate, setShowModalCreate } = progs;
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [aclass, setAClass] = useState<IClass | null>(null);



    const handleDeteleBtn = (id: number) => {
        if (confirm(`Bạn có chắc muốn xóa lớp học ${id}`)) {
            fetch(`${CLASS_API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then(res => {
                    if (res) {
                        toast.warning("Xóa lớp học thành công!");
                        mutate(CLASS_API_URL);
                    } else {
                        toast.error("Xóa lớp học thất bại!");
                    }
                });
        }
    }


    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã lớp học</th>
                        <th>Tên lớp học</th>
                        <th>Môn học</th>
                        <th>Giảng viên</th>
                        <th>Số buổi học</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map(item => {
                        return (
                            <tr key={item.aclassID}>
                                <td>{item.aclassID}</td>
                                <td>{item.className}</td>
                                <td>{item.courseName}</td>
                                <td>{item.teacherName}</td>
                                <td>{item.numberOfSessions}</td>
                                <td>
                                    <Link href={`/admin/aclasses/${item.aclassID}`} className='btn btn-info mx-1'>Chi tiết</Link>
                                    <Button variant='warning' className='mx-1'
                                        onClick={() => {
                                            setAClass(item);
                                            setShowModalUpdate(true);
                                        }}
                                    >Cập nhật</Button>
                                    <Button variant='danger' className='mx-1'
                                        onClick={() => handleDeteleBtn(item.aclassID)}>Xóa</Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <CreateClass
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate}
            />
            <UpdateClass
                aclass={aclass}
                setAClass={setAClass}
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
            /> 
        </div>
    )
}

export default ClassTable