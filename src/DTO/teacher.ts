export interface CreateTeacherProps {
    name: string;
    user: string;
    password: string;
    subjects: string;
}

export interface UpdateTeacherProps {
    name: string;
    user: string;
    password: string;
    subjects: string;
    id: string;
}

export interface ReturnFindAllTeachers {
    key: number;
    name: string;
}