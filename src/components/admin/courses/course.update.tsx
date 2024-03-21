'use client'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { mutate } from "swr"
import { COURSE_API_URL } from "@/constants"

interface IPros {
    course: ICourse | null;
    setCourse: (value: ICourse | null) => void;
    showModalUpdate: boolean;
    setShowModalUpdate: (v: boolean) => void;
}

function UpdateCourse(props: IPros) {
    const { course, setCourse, showModalUpdate, setShowModalUpdate } = props;
    const [courseID, setCourseID] = useState<string>("");
    const [courseName, setCourseName] = useState<string>("");

    useEffect(() => {
        if (course && course.courseID) {
            setCourseID(course.courseID);
            setCourseName(course.courseName);
        }
    }, [course])

    const handleSubmit = () => {
        if (!courseName) {
            toast.error("Vui lòng nhập tên môn học!");
            return;
        }
        fetch(`${COURSE_API_URL}/${courseID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courseID, courseName })
        }).then(res => res.json())
            .then(res => {
                if (res.status === "success") {
                    toast.success(res.message);
                    mutate(COURSE_API_URL);
                        handleCloseModal();
                } else if (res.status === "failed") {
                    toast.error(res.message);
                } else {
                    toast.error("Cập nhật môn học thất bại!");
                }
            });

    }
    const handleCloseModal = () => {
        setCourseID(""),
            setCourseName(""),
            setShowModalUpdate(false),
            setCourse(null)
    }
    return (
        <>
            <Modal
                show={showModalUpdate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật môn học mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên môn học</Form.Label>
                            <Form.Control type="text" placeholder="Nhập tên môn học"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Thoát
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>Cập nhật</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateCourse;