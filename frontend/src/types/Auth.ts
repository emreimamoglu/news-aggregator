import { Dispatch, ReactNode, SetStateAction } from "react";


export type UserContextProps = {
    children?: ReactNode;
};

export type CreateUserContextProps = {
    user : User | null;
    setUser : Dispatch<SetStateAction<User | null>>;
}

export type User = {
    id : string,
    google_id : string | null;
    name : string;
    avatar : {
        id : string;
        url : string;
    } | null;
    email : string;
    email_verified_at : string | null;
    created_at : string;
    updated_at : string;
}

export type LayoutProps = {
    children?: ReactNode;
};

export type RegisterFormData = {
    name : string;
    email : string;
    password : string;
    password_confirmation : string;
    avatarId : string | null;
};

export type ChangePasswordFormData = {
    current_password : string;
    new_password : string;
    new_password_confirmation : string;
}


export type LoginFormData = {
    email : string;
    password : string;
};
