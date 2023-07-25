import { ReactNode } from "react";

export type LayoutProps = {
    children?: ReactNode;
};

export type ArticleCardProps = {
    article : Article;
}

export type ArticleReaderProps = {
    article : Article;
}

export type Article = {
    id : string;
    title : string;
    description : string;
    content : string;
    author : string;
    category : string;
    source : string;
    url : string;
    imate_url : string;
    published_at : string;
}