import { useNavigate } from 'react-router-dom';
import Navbar from './helper/Navbar';
import { NavigationEnum } from '../../router/navigation.enum';
import Search from './helper/Search';

const Home = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate(NavigationEnum.SIGN_IN);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white pb-4 px-4 pt-24 w-full flex justify-center items-start">
      <Navbar onLogout={onLogout} />
      <Search />
    </div>
  );
};
export default Home;
