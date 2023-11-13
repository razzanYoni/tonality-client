import logo from '../assets/images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faUser, faUserCog, faUserCheck } from '@fortawesome/free-solid-svg-icons';
// import profile from '../assets/images/user.png';


const Sidebar = () => {
  return (
    <div className="sidebar text-white w-200 flex fixed flex-col items-center top-0 left-0 h-full border-r border-opacity-10 border-gray-300 pr-6">
      <div className="sidebar-header flex items-center">
        <img src={logo} alt="Tonality Logo" className="logo" />
        <h2 className='title font-bold text-4xl'>Tonality</h2>
      </div>
      <div className="menu h-screen">
        <ul className='text-left'>
        <li className="mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faPlayCircle} className="mr-2" /> Premium Albums
          </li>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faUserCog} className="mr-2" /> Subscription Requests
          </li>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faUserCheck} className="mr-2" /> Active Subscriptions
          </li>
        </ul>
      </div>
      <div className="user-profile flex mb-10 items-center text-left justify-items-left hover:bg-gray-700 p-2 rounded cursor-pointer">
       <FontAwesomeIcon icon={faUser} className="mr-2" /> Username
      </div>
    </div>
  );
};

export default Sidebar;
