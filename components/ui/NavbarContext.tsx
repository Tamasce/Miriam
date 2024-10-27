import { createContext, useContext, useState } from "react";

interface NavbarContextProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const NavbarContext = createContext<NavbarContextProps>({
  isVisible: true,
  setIsVisible: () => {},
});

export const useNavbarContext = () => useContext(NavbarContext);

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <NavbarContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </NavbarContext.Provider>
  );
};
