import { useState, useContext, createContext, ReactNode } from 'react'

type authContextType = {
    login: () => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

const authContextDefaultValues: authContextType = {
    login: () => {},
    logout: () => { },
    isLoggedIn: () => false
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<boolean>(false);

    const login = () => setUser(true);

    const logout = () => setUser(false);

    const isLoggedIn = () => user;

    return (
        <AuthContext.Provider value={{ login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
