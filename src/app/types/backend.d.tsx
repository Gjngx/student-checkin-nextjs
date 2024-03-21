interface ITeacher{
    teacherID: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}
interface ICourse{
    courseID: string;
    courseName: string;
}
interface IRoom{
    roomID: number;
    roomName: string;
}
interface IClass{
    aclassID: number;
    teacherID: string;
    teacherName: string;
    courseID: string;
    courseName: string;
    className: string;
    numberOfSessions: number;
}
