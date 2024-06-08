import { createBrowserRouter, useLoaderData } from 'react-router-dom';
import App from '../App';
import SignUp from '../components/sign_up';
import SignIn from '../components/sign_in';
import { NavigationEnum } from './navigation.enum';
import verify from '../api/verify';

const auth = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    localStorage.clear();
    return { isAuthenticated: false };
  }
  const verified = await verify(token);
  console.log('verified', verified);
  return { isAuthenticated: true };
};

const router = createBrowserRouter([
  {
    path: '/',
    loader: auth,
    Component() {
      const data = useLoaderData() as { isAuthenticated: boolean };
      console.log('data', data);
      return data?.isAuthenticated ? <App /> : <SignIn />;
    }
  },
  {
    path: NavigationEnum.SIGN_UP,
    loader: () => ({ message: 'Hello Data Router!' }),
    Component() {
      const data = useLoaderData() as { message: string };
      data;
      return <SignUp />;
    }
  },
  {
    path: NavigationEnum.SIGN_IN,
    loader: () => ({ message: 'Hello Data Router!' }),
    Component() {
      const data = useLoaderData() as { message: string };
      data;
      return <SignIn />;
    }
  }
]);

export default router;
