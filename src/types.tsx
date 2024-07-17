export interface Basic {
    page: number;
    sizePerpage: number;
    searchKey: string;
}
export interface User extends Basic {
    _id: string;
    user_name: string;
    email: string;
    password: string;
    create_time: string;
    modify_time: string;
}