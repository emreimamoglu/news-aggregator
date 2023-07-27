import { CreateUserContextProps, User, UserContextProps } from '@/interfaces';
import { createContext, useState, useContext,} from 'react';


const UserContext = createContext<CreateUserContextProps>({
    user: null,
    setUser: () => null,
});


export function UserContextProvider({ children }: UserContextProps) {
    const [user, setUser] = useState<User | null>(null);

    return <UserContext.Provider value={{ user, setUser }}> {children} </UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);
