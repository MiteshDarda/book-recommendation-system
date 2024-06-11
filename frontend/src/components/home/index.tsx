import { useNavigate } from 'react-router-dom';
import Navbar from './helper/Navbar';
import { NavigationEnum } from '../../router/navigation.enum';
import Search from './helper/Search';
import Wishlist from './helper/Wishlist';

const Home = () => {
  //* -----------------------------------  CONSTANTS/STATES -----------------------------------
  const navigate = useNavigate();

  //* -----------------------------------  FUNCTIONS -----------------------------------
  const onLogout = () => {
    localStorage.clear();
    navigate(NavigationEnum.SIGN_IN);
  };

  //* ------------------------------------------- JSX -------------------------------------------
  return (
    <div className="min-h-screen bg-[#111111] text-white pb-4 px-4 pt-24 w-full flex flex-col justify-start items-center">
      <Navbar onLogout={onLogout} />
      <Search />
      <Wishlist />
    </div>
  );
};
export default Home;
