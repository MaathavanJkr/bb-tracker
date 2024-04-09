import React, { useContext, useState, useEffect } from "react";
import { SidebarContext } from "../context/SidebarContext";
import {
  MoonIcon,
  SunIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from "../icons";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui";
import { useHistory } from "react-router-dom";

function Header() {
  let history = useHistory();
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);

  // const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [id, setId] = useState("");

  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(process.env.REACT_APP_BACKEND_URL + "/api/auth/validate", {
        method: "POST",
        body: JSON.stringify({
          token: token,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setId(data.id);
            setUsername(data.username);
          } else {
            localStorage.removeItem("token");
            history.push("/login");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      history.push("/login");
    }
  }, [history]);

  // function handleNotificationsClick() {
  //   setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
  // }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          {/* <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Search for projects"
              aria-label="Search"
            />
          </div> */}
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === "dark" ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
          {/* <!-- Notifications menu --> */}
          {/* <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleNotificationsClick}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <BellIcon className="w-5 h-5" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              ></span>
            </button>

            <Dropdown
              align="right"
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
            >
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Messages</span>
                <Badge type="danger">13</Badge>
              </DropdownItem>
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Sales</span>
                <Badge type="danger">2</Badge>
              </DropdownItem>
              <DropdownItem onClick={() => alert('Alerts!')}>
                <span>Alerts</span>
              </DropdownItem>
            </Dropdown>
          </li> */}

          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle"
                src="data:image/png;base64,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"
                alt=""
                aria-hidden="true"
              />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem tag="a" href={"/app/profile/" + id}>
                <OutlinePersonIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>{username}</span>
              </DropdownItem>
              <DropdownItem tag="a" href="#">
                <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem onClick={logOut}>
                <OutlineLogoutIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
