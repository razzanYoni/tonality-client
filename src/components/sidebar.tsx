import logo from '../assets/images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faUser, } from '@fortawesome/free-solid-svg-icons';
import {NavLink} from "react-router-dom";
import {cn} from "@/lib/utils.ts";
import {useAuth} from "@/context/auth-context.tsx";


const Sidebar = () => {
  const { token, username, onLogout } = useAuth();
  return (
    <nav>
        <div className="sidebar text-white w-200 flex fixed flex-col items-center top-0 left-0 h-full border-r border-opacity-10 border-gray-300 pr-6">
          <div className="sidebar-header flex items-center">
            <img src={logo} alt="Tonality Logo" className="logo" />
            <h2 className='title font-bold text-4xl'>Tonality</h2>
          </div>
          <div className="menu h-screen">
            <nav>
              <ul className='text-left'>
                <NavLink to="/album" className={cn("mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center", location.pathname === "/album" && "bg-gray-700")}>
                  <FontAwesomeIcon icon={faPlayCircle} className="mr-2" /> Premium Albums
                </NavLink>
                <NavLink to="/subscription" className={cn("mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center", location.pathname === "/subscription" && "bg-gray-700")}>
                  <FontAwesomeIcon icon={faUser} className="mr-2" /> Subscription
                </NavLink>
              </ul>
            </nav>
          </div>
          <div className="user-profile flex mb-5 items-center text-left justify-items-left ">
           <FontAwesomeIcon icon={faUser} className="mr-2" /> {username}
          </div>
          {
            token &&
              <button className="btn btn-primary mb-10 text-red-600 font-bold hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => onLogout()}>
                Logout
              </button>
          }
        </div>
    </nav>

  );
};

export default Sidebar;
