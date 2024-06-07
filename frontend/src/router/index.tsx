import { createBrowserRouter, useLoaderData } from 'react-router-dom';
import App from '../App';
import SignUp from '../components/sign_up';

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
  }
]);

export default router;
