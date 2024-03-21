'use client'
import Table from 'react-bootstrap/Table';
import Link from 'next/link'
import Button from 'react-bootstrap/Button';
import CreateCourse from '@/components/admin/courses/course.create';
import UpdateCourse from '@/components/admin/courses/course.update';
import { useState } from "react";
import { toast } from 'react-toastify';
import { mutate } from "swr"
import { COURSE_API_URL } from '@/constants';

interface IProps {
    courses: ICourse[];
    showModalCreate: boolean;
    setShowModalCreate: (v: boolean) => void;
}

function CourseTable(progs: IProps) {
    const { courses, showModalCreate, setShowModalCreate } = progs;
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [course, setCourse] = useState<ICourse | null>(null);

    const handleDeteleBtn = (id: string) => {
        if (confirm(`Bạn có chắc muốn xóa môn học ${id}`)) {
            fetch(`${COURSE_API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then(res => {
                    if (res) {
                        toast.warning("Xóa môn học thành công!");
                        mutate(COURSE_API_URL);
                    } else {
                        toast.error("Xóa môn học thất bại!");
                    }
                });
        }
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã môn học</th>
                        <th>Tên môn học</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(item => {
                        return (
                            <tr key={item.courseID}>
                                <td>{item.courseID}</td>
                                <td>{item.courseName}</td>
                                
                                <td>
                                    <Link href={`/admin/courses/${item.courseID}`} className='btn btn-info mx-1'>Chi tiết</Link>
                                    <Button variant='warning' className='mx-1'
                                        onClick={() => {
                                            setCourse(item);
                                            setShowModalUpdate(true);
                                        }}
                                    >Cập nhật</Button>
                                    <Button variant='danger' className='mx-1'
                                        onClick={() => handleDeteleBtn(item.courseID)}>Xóa</Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <CreateCourse
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate}
            />
            <UpdateCourse
                course={course}
                setCourse={setCourse}
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
            />
        </div>
    )
}

export default CourseTable