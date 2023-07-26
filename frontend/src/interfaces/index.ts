import { Dispatch, ReactNode, SetStateAction } from "react";


export type UserContextProps = {
    children?: ReactNode;
};

export type CreateUserContextProps = {
    user : User | null;
    setUser : Dispatch<SetStateAction<User | null>>;
}

export type User = {
    name : string;
    email : string;
}

export type LayoutProps = {
    children?: ReactNode;
};

export type Article = {
    id : string;
    title : string;
    description : string;
    content : string;
    author : string;
    category : string;
    source : string;
    url : string;
    image_url : string;
    published_at : string;
}

export type ArticleCardProps = {
    article : Article;
}

export type ArticleReaderProps = {
    article : Article;
}

export type ArticleListWithReaderProps = {
    articles : Article[];
    enableSearch ?: boolean;
}

export type SidebarIconProps = {
    name : string;
}

export type SectionListProps = {
    type : 'category' | 'source';
    items : Category[] | Source[];
}

export type Category = {
    id : string;
    name : string;
} 

export type Source = {
    id : string;
    name : string;
}

export type ArticleListProps = {
    articles : Article[];
}