import { createContext, useContext } from 'react';

const GlobalApiContext = createContext({
  user: { _id: '', username: '' },
});

const ContextProvider = GlobalApiContext.Provider;

const useGlobalContext = () => {
  return useContext(GlobalApiContext);
};

export { ContextProvider, useGlobalContext };
