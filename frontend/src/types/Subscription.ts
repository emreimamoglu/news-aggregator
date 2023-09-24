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