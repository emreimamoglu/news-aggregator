import { ReactNode } from "react";

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