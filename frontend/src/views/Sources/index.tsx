import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Header from '../../components/Header';
import Searchbar from '../../components/Searchbar';
import SubscriptionList, { ExtendedSource } from '../../components/SubscriptionList';
import { useViewport } from '../../hooks/useViewport';
import styles from './styles.module.scss';
import SubscriptionService from '../../services/Subscription';
import { Source } from '../../types/Article';
import { useUserContext } from '../../contexts/UserContext';
import { SubscribeSourceParams } from '../../types/Subscription';
import { useState } from 'react';


const Sources = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const { width } = useViewport();
    const { user } = useUserContext();
    const queryClient = useQueryClient();

    const { data: sources } = useQuery({
        queryKey: ["sources"],
        queryFn: () => SubscriptionService.getInstance().getSources(),
    })

    const { data: subscribedSources } = useQuery({
        queryKey: ["subscribed-sources"],
        queryFn: () => SubscriptionService.getInstance().getSourceSubscriptions(),
    })


    const { mutateAsync: subscribe } = useMutation({
        mutationFn: ({ user_id, source_id }: SubscribeSourceParams) => SubscriptionService.getInstance().subscribeToSource({
            source_id: source_id,
            user_id: user_id
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subscribed-sources"] });
        },
    })


    const { mutateAsync: unsubscribe } = useMutation({
        mutationFn: ({ source_id }: SubscribeSourceParams) => SubscriptionService.getInstance().unsubscribeFromSource({
            source_id: subscribedSources.data.find((source: any) => source.source_id === source_id).id as string,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subscribed-sources"] });
        },
    })

    const subscribeUnsubscribeSource = async (id: string, subscribed: boolean) => {

        try {
            if (subscribed) {
                await unsubscribe({
                    user_id: user?.id as string,
                    source_id: id
                });
            } else {
                await subscribe({
                    user_id: user?.id as string,
                    source_id: id
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const addSubscriptionData = (data: Source[]): ExtendedSource[] => {
        return data.map((source) => {
            return {
                ...source,
                isSubscribed: [].some((subscribedSource: any) => subscribedSource.source_id === source.id)
            }
        })
    }


    // const filtered = sources.data.filter((source: Source) => {
    //     return source.name.toLowerCase().includes(searchTerm.toLowerCase())
    // })

    // console.log(sources.data);
    
    return (
        <div className={styles.container}>
            {width && width > 835 && <Header searchFn={handleSearch} />}
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>Sources</h1>
                    {width && width < 836 && <Searchbar />}
                </div>
                {sources && subscribedSources && <SubscriptionList data={addSubscriptionData((sources.data))} subscribeFn={subscribeUnsubscribeSource} />}
            </div>
        </div>
    )
};

export default Sources;