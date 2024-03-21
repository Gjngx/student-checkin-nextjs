'use client'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { mutate } from "swr"
import { ROOM_API_URL } from "@/constants"

interface IPros {
    showModalCreate: boolean;
    setShowModalCreate: (v: boolean) => void;
}

function CreateRoom(props: IPros) {
    const { showModalCreate, setShowModalCreate } = props;
    const [roomName, setRoomName] = useState<string>("");
    
    const handleSubmit = () => {
        fetch(ROOM_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ roomName })
        }).then(res => res.json())
            .then(res => {
                if (res.status === "success") {
                    toast.success(res.message);
                    mutate(ROOM_API_URL);
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
                    toast.error("Thêm phòng học thất bại!");
                }
            });

    }
    const handleCloseModal = () => {
        setRoomName(""),
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
                    <Modal.Title>Thêm phòng học mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên phòng học</Form.Label>
                            <Form.Control type="text" placeholder="Nhập tên phòng học"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
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

export default CreateRoom;