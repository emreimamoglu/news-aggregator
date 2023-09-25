import { AxiosResponse } from 'axios';
import axios from '../../config/axios';
import { SubscribeCategoryParams, SubscribeSourceParams, UnsubscribeCategoryParams, UnsubscribeSourceParams } from '../../types/Subscription';
import { Category, Source } from '../../types/Article';

const endpoints = {
    CATEGORIES: '/categories',
    SOURCES: '/sources',
    SOURCE_SUBSCRIPTIONS: '/source-subscriptions',
    CATEGORY_SUBSCRIPTIONS: '/category-subscriptions',
};

class SubscriptionService {
    public static getInstance() {
        if (!this.instance) {
            this.instance = new SubscriptionService();
        }

        return this.instance;
    }

    private static instance: SubscriptionService;

    public getCategories() {
        return axios
            .get<AxiosResponse<Category[]>>(endpoints.CATEGORIES)
            .then((res) => res.data.data)
    }

    public getSources() {
        return axios
            .get<AxiosResponse<Source[]>>(endpoints.SOURCES)
            .then((res) => res.data.data)
    }

    public subscribeToCategory({ category_id, user_id }: SubscribeCategoryParams) {
        return axios
            .post<any>(endpoints.CATEGORY_SUBSCRIPTIONS, { category_id, user_id })
            .then((res) => res.data)
    }

    public subscribeToSource({ source_id, user_id }: SubscribeSourceParams) {
        return axios
            .post<any>(endpoints.SOURCE_SUBSCRIPTIONS, { source_id, user_id })
            .then((res) => res.data)
    }

    public getCategorySubscriptions() { 
        return axios
            .get<any>(`${endpoints.CATEGORY_SUBSCRIPTIONS}`)
            .then((res) => res.data)
    }

    public getSourceSubscriptions() {
        return axios
            .get<any>(`${endpoints.SOURCE_SUBSCRIPTIONS}`)
            .then((res) => res.data)
     }

    public unsubscribeFromCategory({ category_id }: UnsubscribeCategoryParams) {
        return axios
            .delete<any>(`${endpoints.CATEGORY_SUBSCRIPTIONS}/${category_id}`)
            .then((res) => res.data)
     }

    public unsubscribeFromSource({ source_id }: UnsubscribeSourceParams) {
        return axios
            .delete<any>(`${endpoints.SOURCE_SUBSCRIPTIONS}/${source_id}`)
            .then((res) => res.data)
     }
}

export default SubscriptionService;
