import React from 'react'
import RoomDetail from "@/components/admin/rooms/room.detail"
function RoomsDetail({ params }: { params: { id: string } }) {
  return (
    <div>
        <RoomDetail
        id = {params.id}/>
    </div>
  )
}

export default RoomsDetail