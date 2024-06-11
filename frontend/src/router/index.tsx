import { createBrowserRouter, useLoaderData } from 'react-router-dom';
import App from '../App';
import SignUp from '../components/sign_up';
import SignIn from '../components/sign_in';
import { NavigationEnum } from './navigation.enum';
import verify from '../api/verify';

const auth = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.clear();
      return { isAuthenticated: false };
    }
    const verified = await verify(token);
    if (!verified) {
      localStorage.clear();
      return { isAuthenticated: false };
    }
    return { isAuthenticated: true };
  } catch (error) {
    console.log('error', error);
    return { isAuthenticated: false };
  }
};

const router = createBrowserRouter([
  {
    path: '/',
    loader: auth,
    Component() {
      const data = useLoaderData() as { isAuthenticated: boolean };
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
