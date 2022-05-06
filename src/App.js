import { createContext, useState, useEffect } from "react";
import Header from "./Layouts/Header";
import { Outlet, useLocation } from "react-router-dom";

export const UserContext = createContext();

function App() {
  const [isLogged, setLogged] = useState(false);

  const [width, setWidth] = useState(null);

  const { pathname } = useLocation();

  const onResize = () => {
    const windowWidth = window.innerWidth;
    setWidth(windowWidth);
  };

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const contextValue = {
    isLogged: isLogged,
    setLogged: setLogged,
    width: width,
    pathname: pathname,
  };

  return (
    <UserContext.Provider value={contextValue}>
      <div className="App">
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
}

export default App;
