import { createBrowserRouter, useLoaderData } from 'react-router-dom';
import App from '../App';
import SignUp from '../components/sign_up';
import SignIn from '../components/sign_in';

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => ({ message: 'Hello Data Router!' }),
    Component() {
      const data = useLoaderData() as { message: string };
      data;
      return <App />;
    }
  },
  {
    path: '/sign_up',
    loader: () => ({ message: 'Hello Data Router!' }),
    Component() {
      const data = useLoaderData() as { message: string };
      data;
      return <SignUp />;
    }
  },
  {
    path: '/sign_in',
    loader: () => ({ message: 'Hello Data Router!' }),
    Component() {
      const data = useLoaderData() as { message: string };
      data;
      return <SignIn />;
    }
  }
]);

export default router;
