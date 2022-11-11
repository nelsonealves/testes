export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}
export function signInSuccess(token, user, company) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user, company },
  };
}

export function signUpRequest(name, cnpj, razao, email, password, role) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {
      name, cnpj, razao, email, password, role,
    },
  };
}
export function signUpSuccess() {
  return {
    type: '@auth/SIGN_UP_SUCCESS',
    payload: {
    },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
