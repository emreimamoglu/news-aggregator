import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Header from '../../components/Header';
import Searchbar from '../../components/Searchbar';
import SubscriptionList, { ExtendedCategory } from '../../components/SubscriptionList';
import { useViewport } from '../../hooks/useViewport';
import SubscriptionService from '../../services/Subscription';
import styles from './styles.module.scss';
import { SubscribeCategoryParams } from '../../types/Subscription';
import { useUserContext } from '../../contexts/UserContext';
import { Category } from '../../types/Article';
import { useCallback, useState } from 'react';


const Categories = () => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const { width } = useViewport();
    const { user } = useUserContext();
    const queryClient = useQueryClient();

    const searchCategory = useCallback(
        (categories: Category[]) => {
            if (!searchTerm) return categories;
            return categories.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()));
        },
        [searchTerm]
    );

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: () => SubscriptionService.getInstance().getCategories(),
        select: searchCategory,
    })

    const { data: subscribedCategories } = useQuery({
        queryKey: ["subscribed-categories"],
        queryFn: () => SubscriptionService.getInstance().getCategorySubscriptions(),
    })

    const { mutateAsync: subscribe } = useMutation({
        mutationFn: ({ user_id, category_id }: SubscribeCategoryParams) => SubscriptionService.getInstance().subscribeToCategory({
            category_id: category_id,
            user_id: user_id
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subscribed-categories"] });
        },
    })


    const { mutateAsync: unsubscribe } = useMutation({
        mutationFn: ({ category_id }: SubscribeCategoryParams) => SubscriptionService.getInstance().unsubscribeFromCategory({
            category_id: subscribedCategories.data.find((category: any) => category.category_id === category_id).id as string,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subscribed-categories"] });
        },
    })

    const subscribeUnsubscribeCategory = async (id: string, subscribed: boolean) => {

        try {
            if (subscribed) {
                await unsubscribe({
                    user_id: user?.id as string,
                    category_id: id
                });
            } else {
                await subscribe({
                    user_id: user?.id as string,
                    category_id: id
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const addSubscriptionData = (data: Category[]): ExtendedCategory[] => {
        return data.map((category) => {
            return {
                ...category,
                isSubscribed: subscribedCategories.data.some((subscribedCategory: any) => subscribedCategory.category_id === category.id)
            }
        })
    }

    return (
        <div className={styles.container}>
            {width && width > 835 && <Header searchFn={handleSearch} />}
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>Categories</h1>
                    {width && width < 836 && <Searchbar />}
                </div>
                {categories && subscribedCategories && <SubscriptionList data={addSubscriptionData(categories)} subscribeFn={subscribeUnsubscribeCategory} />}
            </div>
        </div>
    )
};

export default Categories;