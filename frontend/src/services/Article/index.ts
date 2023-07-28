import axios from '@/config/axios';
import { ArticleQueryParams, SaveArticleParams } from '@/interfaces';

const endpoints = {
    ARTICLES: '/articles',
    SAVED_ARTICLES: '/saved-articles',
    SAVED_ARTICLES_LIST: '/user-saved-articles',
    CUSTOM_FEED : '/custom-feed'
};

class ArticleService {
    public static getInstance() {
        if (!this.instance) {
            this.instance = new ArticleService();
        }

        return this.instance;
    }

    private static instance: ArticleService;

    public getArticles(data: ArticleQueryParams) {
        return axios
            .get<any>(endpoints.ARTICLES, { params: data })
            .then((res) => res.data)
            .catch((err) => {
            });
    }

    public saveArticle({article_id,user_id} : SaveArticleParams) {
        return axios
            .post<any>(endpoints.SAVED_ARTICLES, { article_id,user_id })
            .then((res) => res.data)
            .catch((err) => {
            });
    }

    public unsaveArticle({article_id} : Omit<SaveArticleParams,'user_id'>) {
        return axios
            .delete<any>(`${endpoints.SAVED_ARTICLES}/${article_id}`)
            .then((res) => res.data)
            .catch((err) => {
            });
    }

    public getSavedArticleIds() {
        return axios
            .get<any>(endpoints.SAVED_ARTICLES)
            .then((res) => res.data)
            .catch((err) => {
            });
    }

    public getSavedArticlesList(){
        return axios
            .get<any>(`${endpoints.SAVED_ARTICLES_LIST}`)
            .then((res) => res.data)
            .catch((err) => {
            });
    }

    
    public getCustomFeed(data: ArticleQueryParams) {
        return axios
            .get<any>(endpoints.CUSTOM_FEED, { params: data })
            .then((res) => res.data)
            .catch((err) => {
            });
    }
}

export default ArticleService;
