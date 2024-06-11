import ReactDOM from 'react-dom/client';
import store from './store/index.ts';
import { Provider } from 'react-redux';
import Background from './components/background/index.tsx';
import './styles/output.css';
import './styles/index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <div className="nanum-gothic-regular ">
      <Background />
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </div>
  </Provider>
);
