import logo from '../assets/images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faUser, } from '@fortawesome/free-solid-svg-icons';
import {NavLink} from "react-router-dom";
// import {useAuth} from "@/TonalityApp.tsx";
// import {NavLink, useNavigate} from 'react-router-dom';
// import profile from '../assets/images/user.png';


const Sidebar = () => {
  // TODO : Add logout functionality
  // const { token, onLogout } = useAuth();
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
                <NavLink to="/album" className="mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center">
                  <FontAwesomeIcon icon={faPlayCircle} className="mr-2" /> Premium Albums
                </NavLink>
                <NavLink to="/subscription" className="mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center">
                  <FontAwesomeIcon icon={faUser} className="mr-2" /> Subscription
                </NavLink>
              </ul>
            </nav>
          </div>
          <div className="user-profile flex mb-5 items-center text-left justify-items-left ">
           <FontAwesomeIcon icon={faUser} className="mr-2" /> Username
          </div>
          {
            // TODO : Add logout functionality
            // token &&
            //   <button className="btn btn-primary mb-10 text-red-600 font-bold hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={onLogout}>
              <button className="btn btn-primary mb-10 text-red-600 font-bold hover:bg-gray-700 p-2 rounded cursor-pointer">
                Logout
              </button>
          }
        </div>
    </nav>

  );
};

export default Sidebar;
