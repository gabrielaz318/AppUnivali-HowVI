export interface CreateStudentProps {
    name: string;
    user: string;
    password: string;
}

export interface UpdateStudentProps {
    name: string;
    user: string;
    password: string;
    id: string;
}

export interface ReturnFindAllStudents {
    key: number;
    name: string;
}