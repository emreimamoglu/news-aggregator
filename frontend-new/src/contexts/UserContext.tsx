import { CreateUserContextProps, User, UserContextProps } from '../types/Auth';
import { createContext, useState, useContext, useMemo } from 'react';

const UserContext = createContext<CreateUserContextProps | null>(null);

export function UserContextProvider({ children }: UserContextProps) {
    const [user, setUser] = useState<User | null>(null);

    const contextValue = useMemo(() => ({ user, setUser }), [user, setUser]);

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

export const useUserContext = () => {
    const contextValue = useContext(UserContext);

    if (!contextValue) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }

    return contextValue;
};