import axios from '@/config/axios';
import { ArticleQueryParams } from '@/interfaces';

const endpoints = {
    ARTICLES: '/articles',
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
}

export default ArticleService;
