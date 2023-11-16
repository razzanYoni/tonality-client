import logo from '../assets/images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faUser, } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
// import profile from '../assets/images/user.png';


const Sidebar = () => {
  const navigate = useNavigate();

  const toPremAlbum = () => {
    navigate('/album');
  }
  return (
    <div className="sidebar text-white w-200 flex fixed flex-col items-center top-0 left-0 h-full border-r border-opacity-10 border-gray-300 pr-6">
      <div className="sidebar-header flex items-center">
        <img src={logo} alt="Tonality Logo" className="logo" />
        <h2 className='title font-bold text-4xl'>Tonality</h2>
      </div>
      <div className="menu h-screen">
        <ul className='text-left'>
        <li className="mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center" onClick={toPremAlbum}>
            <FontAwesomeIcon icon={faPlayCircle} className="mr-2" /> Premium Albums
          </li>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-2" /> Subscription
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
