import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  FC,
  ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextProps = {
  logout: () => void;
  token: string | null;
  setTokenToStorage: (token: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthenticationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);


  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("sessionToken");
      return token;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
    };
    fetchToken();
  }, []);

  const logout = () => {
    AsyncStorage.removeItem("sessionToken");
    setToken(null);
  };

  const setTokenToStorage = async (token: string) => {
    try {
      setToken(token);
      await AsyncStorage.setItem("sessionToken", token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        token,
        setTokenToStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === null) {
      throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
  }
export { AuthenticationProvider, useAuthContext };
