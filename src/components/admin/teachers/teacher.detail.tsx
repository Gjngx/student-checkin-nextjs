'use client'
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import Link from 'next/link'
import useSWR from 'swr'
import { TEACHERS_API_URL } from "@/constants"
import IsLoading from '@/components/admin/isLoading'

interface IProps {
  id: string;
}

export default function TeacherDetail(progs: IProps) {
  const { id } = progs;
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, isLoading } = useSWR(`${TEACHERS_API_URL}/${id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  //console.log(data)
  if (isLoading) return (
    <IsLoading />
  );
  else if (data)
    return (
      <>
        <section className="vh-50 gradient-custom-2">
          <MDBContainer className="py-5 h-50">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol md="10" lg="8" xl="6">
                <MDBCard
                  className="card-stepper"
                  style={{ borderRadius: "16px" }}
                >
                  <MDBCardHeader className="p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <MDBTypography tag="h4" className="bold text-primary">
                        Thông tin chi tiết giảng viên: {data.data.firstName} {data.data.lastName}
                      </MDBTypography>
                    </div>
                  </MDBCardHeader>
                  <MDBCardBody className="p-4">
                    <div className="d-flex flex-row mb-2 pb-1">
                      <div className="flex-fill">
                      <p className="text-info">
                      Mã giảng viên:{" "}
                        <span className="text-body">{data.data.teacherID}</span>
                      </p>
                      <p className="text-info">
                      Họ và tên lót:{" "}
                        <span className="text-body">{data.data.lastName}</span>
                      </p>
                      <p className="text-info">
                      Tên giảng viên:{" "}
                        <span className="text-body">{data.data.firstName}</span>
                      </p>
                      <p className="text-info">
                      Email giảng viên:{" "}
                        <span className="text-body">{data.data.email}</span>
                      </p>
                      <p className="text-info">
                      Số điện thoại:{" "}
                        <span className="text-body">{data.data.phoneNumber}</span>
                      </p>
                    </div>
                    </div>
                  </MDBCardBody>
                  <MDBCardFooter className="p-4">
                    <div className="d-flex justify-content-between">
                      <div className="border-start h-100"></div>
                      <MDBTypography tag="h5" className="fw-normal mb-0">
                        <Link className="btn btn-secondary mt-3" href={'/admin/teachers'}>Thoát</Link>
                      </MDBTypography>
                    </div>
                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </>
    );
}