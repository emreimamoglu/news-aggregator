import { useNavigate } from "react-router-dom";
import { Routes } from "../../routes";
import { useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import AuthService from "../../services/Auth";

const withAuth = (Component: React.FC) => {

    const Auth = (props: any) => {
        const navigate = useNavigate();
        const { user, setUser } = useUserContext();
        const hasToken = localStorage.getItem('token');

        const { data } = useQuery(
            ['me'],
            () => AuthService.getInstance().me(),
            {
                enabled: Boolean(!user && hasToken)
            }
        );

        useEffect(() => {
            
            if (!hasToken) {
                localStorage.clear();
                navigate(Routes.LOGIN);
                return;
            }
            if (!user && data) {
                setUser(data);
            }
        }, [hasToken, user, data]);
        return <Component {...props} />;
    };
    return Auth;
};

export default withAuth;