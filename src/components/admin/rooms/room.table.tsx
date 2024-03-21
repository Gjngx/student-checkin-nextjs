'use client'
import Table from 'react-bootstrap/Table';
import Link from 'next/link'
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { toast } from 'react-toastify';
import { mutate } from "swr"
import { ROOM_API_URL } from '@/constants';
import CreateRoom from '@/components/admin/rooms/room.create'
import UpdateRoom from '@/components/admin/rooms/room.update'

interface IProps {
    rooms: IRoom[];
    showModalCreate: boolean;
    setShowModalCreate: (v: boolean) => void;
}

function RoomTable(progs: IProps) {
    const { rooms, showModalCreate, setShowModalCreate } = progs;
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [room, setRoom] = useState<IRoom | null>(null);

    const handleDeteleBtn = (id: number) => {
        if (confirm(`Bạn có chắc muốn xóa phòng học ${id}`)) {
            fetch(`${ROOM_API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then(res => {
                    if (res) {
                        toast.warning("Xóa phòng học thành công!");
                        mutate(ROOM_API_URL);
                    } else {
                        toast.error("Xóa phòng học thất bại!");
                    }
                });
        }
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã phòng học</th>
                        <th>Tên phòng học</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(item => {
                        return (
                            <tr key={item.roomID}>
                                <td>{item.roomID}</td>
                                <td>{item.roomName}</td>
                                
                                <td>
                                    <Link href={`/admin/rooms/${item.roomID}`} className='btn btn-info mx-1'>Chi tiết</Link>
                                    <Button variant='warning' className='mx-1'
                                        onClick={() => {
                                            setRoom(item);
                                            setShowModalUpdate(true);
                                        }}
                                    >Cập nhật</Button>
                                    <Button variant='danger' className='mx-1'
                                        onClick={() => handleDeteleBtn(item.roomID)}>Xóa</Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <CreateRoom
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate}
            />
            <UpdateRoom
                room={room}
                setRoom={setRoom}
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
            />
        </div>
    )
}

export default RoomTable