import React from 'react'
import CourseDetail from "@/components/admin/courses/course.detail"
import { Metadata } from "next";
import { COURSE_API_URL } from "@/constants"

type Props = {
  params: { id: string };
};

export const generateMetadata = async (
  props: Props
): Promise<Metadata> => {
  const { params } = props
  const fetchCoursesById = async (id: string) => {
    const response = await fetch(`${COURSE_API_URL}/${params.id}`);
    const result = await response.json();
    return result;
  };
  const course = await fetchCoursesById(params.id)
  return {
    title: "Chi tiết" + course.data.courseName,
  };
};

function CoursesDetail({ params }: { params: { id: string } }) {
  return (
    <div>
        <CourseDetail
        id = {params.id}/>
    </div>
  )
}

export default CoursesDetail