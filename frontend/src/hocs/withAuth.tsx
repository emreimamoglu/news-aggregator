import { useUserContext } from "@/contexts/User";
import Home from "@/views/Home";

export const withAuth = (Component: React.FC) => {
    return (props: any) => {
        const { user } = useUserContext();

        if (!user) {
            return <Home />
        }

        return <Component {...props} />
    }
};