'use client'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { mutate } from "swr"
import { CLASS_API_URL, TEACHERS_API_URL, COURSE_API_URL } from "@/constants"

interface IPros {
    showModalCreate: boolean;
    setShowModalCreate: (v: boolean) => void;
}

function CreateClass(props: IPros) {
    const { showModalCreate, setShowModalCreate } = props;
    const [teachers, setTeachers] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [teacherID, setTeacherID] = useState<string>("");
    const [courseID, setCourseID] = useState<string>("");
    const [className, setClassName] = useState<string>("");
    const [numberOfSessions, setNumberOfSessions] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teacherResponse, courseResponse] = await Promise.all([
                    fetch(TEACHERS_API_URL),
                    fetch(COURSE_API_URL)
                ]);
    
                if (!teacherResponse.ok || !courseResponse.ok) {
                    throw new Error('Lỗi gọi api!');
                }
    
                const teacherData = await teacherResponse.json();
                const courseData = await courseResponse.json();
    
                setTeachers(teacherData);
                setCourses(courseData);
            } catch (error) {
                console.error('Không thể lấy dữ liêu:', error);
            }
        };
        fetchData();
    }, [])

    const handleSubmit = () => {
        fetch(CLASS_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ teacherID, courseID, className, numberOfSessions })
        }).then(res => res.json())
            .then(res => {
                if (res.status === "success") {
                    toast.success(res.message);
                    mutate(CLASS_API_URL),
                        handleCloseModal();
                } else if (res.status === "failed") {
                    toast.error(res.message);
                } else if (res.status === "error") {
                    if (Array.isArray(res.data)) {
                        res.data.forEach((errorMessage: string) => {
                            toast.error(errorMessage);
                        });
                    } else {
                        toast.error(res.data);
                    }
                }
                else {
                    toast.error("Thêm lớp học thất bại!");
                }
            });

    }
    const handleCloseModal = () => {
        setTeacherID(""),
            setCourseID(""),
            setClassName(""),
            setNumberOfSessions(0),
            setShowModalCreate(false)
    }
    return (
        <>
            <Modal
                show={showModalCreate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm lớp học mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Mã giảng viên</Form.Label>
                            <Form.Select aria-label="Mã giảng viên" onChange={(e) => setTeacherID(e.target.value)}>
                                <option value="">Vui lòng chọn giảng viên</option>
                                {teachers.map((teacher: any) => (
                                    <option key={teacher.teacherID} value={teacher.teacherID}>{teacher.lastName} {teacher.firstName}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mã môn học</Form.Label>
                            <Form.Select aria-label="Mã môn học" onChange={(e) => setCourseID(e.target.value)}>
                                <option value="">Vui lòng chọn môn học</option>
                                {courses.map((course: any) => (
                                    <option key={course.courseID} value={course.courseID}>{course.courseName}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên lớp học</Form.Label>
                            <Form.Control type="text" placeholder="Nhập tên lớp học"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Số buổi học</Form.Label>
                            <Form.Control type="number"
                                value={numberOfSessions}
                                onChange={(e) => setNumberOfSessions((parseInt(e.target.value)))}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Thoát
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>Lưu</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateClass;