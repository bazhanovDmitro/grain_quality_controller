import { createContext, useState, useEffect } from "react";
import Header from "./Layouts/Header";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar";

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
        {/* Sidebar location */}
        <div className="main">
          <Header />
          <Outlet />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
