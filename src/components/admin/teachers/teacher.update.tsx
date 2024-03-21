'use client'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { mutate } from "swr"
import { TEACHERS_API_URL } from "@/constants"

interface IPros {
    teacher: ITeacher | null;
    setTeacher: (value: ITeacher | null) => void;
    showModalUpdate: boolean;
    setShowModalUpdate: (v: boolean) => void;
}

function UpdateTeacher(props: IPros) {
    const { teacher, setTeacher, showModalUpdate, setShowModalUpdate } = props;
    const [teacherID, setTeacherID] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    useEffect(() => {
        if (teacher && teacher.teacherID) {
            setTeacherID(teacher.teacherID);
            setFirstName(teacher.firstName);
            setLastName(teacher.lastName);
            setEmail(teacher.email);
            setPhoneNumber(teacher.phoneNumber);
        }
    }, [teacher])

    const handleSubmit = () => {
        if (!teacherID) {
            toast.error("Vui lòng nhập mã giảng viên!");
            return;
        }
        if (!firstName) {
            toast.error("Vui lòng nhập tên giảng viên!");
            return;
        }
        if (!lastName) {
            toast.error("Vui lòng nhập Họ và tên lót giảng viên!");
            return;
        }
        if (!email) {
            toast.error("Vui lòng nhập email giảng viên!");
            return;
        }
        if (!phoneNumber) {
            toast.error("Vui lòng nhập số điện thoại giảng viên!");
            return;
        }
        fetch(`${TEACHERS_API_URL}/${teacherID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ teacherID, firstName, lastName, email, phoneNumber })
        }).then(res => res.json())
            .then(res => {
                if (res.status === "success") {
                    toast.success(res.message);
                    mutate(TEACHERS_API_URL),
                        handleCloseModal();
                } else if (res.status === "failed") {
                    toast.error(res.message);
                } else {
                    toast.error("Cập nhật giảng viên thất bại!");
                }
            });

    }
    const handleCloseModal = () => {
        setTeacherID(""),
        setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhoneNumber(""),
        setShowModalUpdate(false),
        setTeacher(null)
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
                    <Modal.Title>Thêm giảng viên mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Mã giảng viên</Form.Label>
                            <Form.Control type="text" placeholder="Nhập mã giảng viên"
                                value={teacherID}
                                onChange={(e) => setTeacherID(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ và tên lót</Form.Label>
                            <Form.Control type="text" placeholder="Nhập họ và tên lót"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên giảng viên</Form.Label>
                            <Form.Control type="text" placeholder="Nhập tên giảng viên"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Nhập email giảng viên"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control type="text" placeholder="Nhập số điện thoại giảng viên"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
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

export default UpdateTeacher;