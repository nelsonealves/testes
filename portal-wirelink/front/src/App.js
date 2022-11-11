import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import Routes from './routes';
import history from './services/history';
import { store, persistor } from './store';
import './styles.scss';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <ConfigProvider locale={ptBR}>
            <Routes />
            <ToastContainer autoClose={3000} />
          </ConfigProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
