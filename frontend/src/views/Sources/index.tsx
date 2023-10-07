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
import { useCallback, useState } from 'react';
import withAuth from '../../components/withAuth';


const Sources = () => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const { width } = useViewport();
    const { user } = useUserContext();
    const queryClient = useQueryClient();

    const searchSource = useCallback(
        (sources: Source[]) => {
            if (!searchTerm) return sources;
            return sources.filter((source) => source.name.toLowerCase().includes(searchTerm.toLowerCase()));
        },
        [searchTerm]
    );

    const { data: sources } = useQuery({
        queryKey: ["sources"],
        queryFn: () => SubscriptionService.getInstance().getSources(),
        select : searchSource
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
                isSubscribed: subscribedSources.data.some((subscribedSource: any) => subscribedSource.source_id === source.id)
            }
        })
    }

    return (
        <div className={styles.container}>
            {width && width > 835 && <Header searchFn={handleSearch} />}
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>Sources</h1>
                    {width && width < 836 && <Searchbar />}
                </div>
                {sources && subscribedSources && <SubscriptionList data={addSubscriptionData((sources))} subscribeFn={subscribeUnsubscribeSource} />}
            </div>
        </div>
    )
};

export default withAuth(Sources);