import TopBar from "./components/TopBar";

import { Outlet } from "react-router-dom";
import { HomeSlider } from "./layout";
import Topbar from "./components/Navbar/Topbar";

import { useState } from "react";
import LocationCity from "./layout/Location/City/City";
import LocationCountry from "./layout/Location/Country/Country";
import LocationState from "./layout/Location/State/State";
import DesktopSidebar from "./components/Navbar/Desktopnav/Sidebar";
import MobileSidebar from "./components/Navbar/Mobilenav/Sidebar";

function Home({ children }) {
  const [show, setshow] = useState(true);
  const [showsidebar, setshowbar] = useState(false);

  return (
    <>
      <div style={{ position: "sticky" }}>
        <Topbar setshow={setshow} show={show} />
      </div>
      <div className="flex pl-0 h-[91vh] w-full">
        <div style={{ position: "sticky" }}>
          <DesktopSidebar setshow={setshow} show={show} />
          <MobileSidebar setshow={setshow} show={show} />
        </div>
        <div className="scrollable-content overflow-y-auto w-full ">
          {children}
        </div>
      </div>
    </>
  );
}

export default Home;
