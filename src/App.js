import { createContext, useState, useEffect } from "react";
import Header from "./Layouts/Header";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar/index";
import { ANON } from "./Constants/roles";

export const UserContext = createContext();

function App() {
  const [role, setRole] = useState(ANON);

  const [width, setWidth] = useState(null);
  const [isSidebarVisible, setSidebar] = useState(false);
  const [userInfo, setUserInfo] = useState({});

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
    userInfo: userInfo,
    setUserInfo: setUserInfo,
    role: role,
    setRole: setRole,
    width: width,
    pathname: pathname,
    isSidebarVisible: isSidebarVisible,
    setSidebar: setSidebar,
  };

  return (
    <UserContext.Provider value={contextValue}>
      <div className="App">
        <Sidebar />
        <div className="main">
          <Header />
          <Outlet />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
