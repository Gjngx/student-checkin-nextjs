import ClassDetail from '@/components/admin/aclasses/class.detail'


function Rooms({ params }: { params: { id: string } }) {

  return (
    <div>
      <ClassDetail
      id = {params.id}/>
    </div>
  )
}

export default Rooms