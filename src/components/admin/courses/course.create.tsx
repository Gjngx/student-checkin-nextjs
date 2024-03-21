'use client'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { mutate } from "swr"
import { COURSE_API_URL } from "@/constants"

interface IPros {
    showModalCreate: boolean;
    setShowModalCreate: (v: boolean) => void;
}

function CreateCourse(props: IPros) {
    const { showModalCreate, setShowModalCreate } = props;
    const [courseID, setCourseID] = useState<string>("");
    const [courseName, setCourseName] = useState<string>("");
    const handleSubmit = () => {

        fetch(COURSE_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courseID, courseName })
        }).then(res => res.json())
            .then(res => {
                if (res.status === "success") {
                    toast.success(res.message);
                    mutate(COURSE_API_URL),
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
                    toast.error("Thêm môn học thất bại!");
                }
            });

    }
    const handleCloseModal = () => {
        setCourseID(""),
            setCourseName(""),
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
                    <Modal.Title>Thêm môn học mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Mã môn học</Form.Label>
                            <Form.Control type="text" placeholder="Nhập mã môn học"
                                value={courseID}
                                onChange={(e) => setCourseID(e.target.value)}
                            />
                        </Form.Group>
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
                    <Button variant="primary" onClick={() => handleSubmit()}>Lưu</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateCourse;