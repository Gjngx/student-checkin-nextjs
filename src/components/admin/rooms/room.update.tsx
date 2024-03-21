'use client'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { mutate } from "swr"
import { ROOM_API_URL } from "@/constants"

interface IPros {
    room: IRoom | null;
    setRoom: (value: IRoom | null) => void;
    showModalUpdate: boolean;
    setShowModalUpdate: (v: boolean) => void;
}

function UpdateRoom(props: IPros) {
    const { room, setRoom, showModalUpdate, setShowModalUpdate } = props;
    const [roomID, setRoomID] = useState<number>();
    const [roomName, setRoomName] = useState<string>("");


    useEffect(() => {
        if (room && room.roomID) {
            setRoomID(room.roomID);
            setRoomName(room.roomName);
        }
    }, [room])

    const handleSubmit = () => {
        if (!roomName) {
            toast.error("Vui lòng nhập tên môn học!");
            return;
        }
        fetch(`${ROOM_API_URL}/${roomID}`, {
            method: 'PUT',
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
                } else {
                    toast.error("Cập nhật phòng học thất bại!");
                }
            });

    }
    const handleCloseModal = () => {
        setRoomName(""),
        setShowModalUpdate(false),
        setRoom(null)
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
                    <Modal.Title>Cập nhật phòng học mới</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleSubmit()}>Cập nhật</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateRoom;