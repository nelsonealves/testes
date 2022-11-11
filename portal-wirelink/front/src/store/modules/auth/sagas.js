import { Modal } from 'antd';
import { toast } from 'react-toastify';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import api from '../../../services/api';
import history from '../../../services/history';
import { getCookie } from '../../../utils/getCookie';
import { signFailure, signInSuccess, signUpSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    let selectedCompany = 0;

    const csrftoken = getCookie('csrftoken');
    const { email, password } = payload;

    const response = yield call(api.post, '/api/user/login/', { email, password }, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
    });

    const { access_token, user } = response.data;

    if (user[0].companys.length === 0) {
      toast.error('Nenhuma empresa está associada ao seu usuário. Por favor, entre em contato com a Wirelink.');
      yield put(signFailure());
    } else {
      // Check if the user selected any company
      selectedCompany = parseInt(
        localStorage.getItem('wirelink::user::selectedCompany'),
        10,
      );

      if (selectedCompany > 0) {
        // Check if the selected company is still available for this specific user
        const checkIfCompanyIsRelated = user.companys?.filter(
          (company) => company.id === selectedCompany,
        );

        if (checkIfCompanyIsRelated && checkIfCompanyIsRelated.length === 0) {
          selectedCompany = user[0].companys[0].id;
          // If the company is not listed on the user, set the first as default
        }
      } else {
        // Set the first company as the default
        selectedCompany = user[0].companys[0].id;
      }

      localStorage.setItem('wirelink::user::selectedCompany', selectedCompany);
      localStorage.setItem('wirelink::user::email', email);

      api.defaults.headers.Authorization = `Bearer ${access_token}`;

      try {
        yield put(signInSuccess(access_token, user[0], selectedCompany));
      } catch (error) {
        console.error('ERROR:', error);
      }

      history.push('/dashboard');
    }
  } catch (error) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const {
      name, cnpj, razao, email, password, role,
    } = payload;
    yield call(api.post, '/api/user/signup/', {
      name, cnpj, reason: razao, email, password, access_type: role,
    });
    yield put(signUpSuccess());
    Modal.success({ title: 'Sucesso', content: 'Sua solicitação foi encaminhada para nossos atendentes aguarde o contato.' });
  } catch (error) {
    toast.error('Falha no cadastro, verifique seus dados');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}
export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
