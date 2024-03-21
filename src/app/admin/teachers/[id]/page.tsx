import React from 'react'
import TeacherDetail from "@/components/admin/teachers/teacher.detail"
function TeachersDetail({ params }: { params: { id: string } }) {
  return (
    <div>
        <TeacherDetail
        id = {params.id}/>
    </div>
  )
}

export default TeachersDetail