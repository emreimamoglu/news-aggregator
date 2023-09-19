import { Dispatch, SetStateAction } from "react";

export type Article = {
    id : string;
    title : string;
    description : string;
    content : string;
    author : string;
    source_name : string;
    url : string;
    image_url : string;
    published_at : string;
}

export type ArticleCardProps = {
    article : Article;
    savedArticles : SavedArticle[];
    fetchSavedArticles : () => Promise<void>;
    setSelectedArticle ?: Dispatch<SetStateAction<Article | null>>;
}

export type ArticleReaderProps = {
    article : Article;
}

export type ArticleListWithReaderProps = {
    articles : Article[];
    enableSearch ?: boolean;
    currentPage : number;
    lastPage : number;
    callback : (page : number) => void;
    setSearch ?: Dispatch<SetStateAction<string>>
    setCategoryIds ?: Dispatch<SetStateAction<string[]>>
    setSourceIds ?: Dispatch<SetStateAction<string[]>>
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
    fetchSavedArticles : () => Promise<void>;
}

export type ArticleQueryParams = {
    page ?: string;
    search ?: string;
    category_ids ?: string;
    source_ids ?: string;
}

export type GetArticleParams = {
    article_id : string;
}

export type SubscribeCategoryParams = {
    category_id : string;
    user_id : string;
}


export type SubscribeSourceParams = {
    source_id : string;
    user_id : string;
}

export type UnsubscribeCategoryParams = {
    category_id : string;
}

export type UnsubscribeSourceParams = {
    source_id : string;
}

export type PaginationProps = {
    currentPage : number;
    callback : (page : number) => void;
    lastPage : number;
};

export type SaveArticleParams = {
    article_id : string;
    user_id : string;
};

export type SavedArticle ={
    id : string;
    article_id : string;
    user_id : string;
}

export type SourceSubscriptions = {
    id : string;
    source_id : string;
    user_id : string;
}

export type CategorySubscriptions = {
    id : string;
    category_id : string;
    user_id : string;
}