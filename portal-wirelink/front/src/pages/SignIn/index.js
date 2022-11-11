import { LoadingOutlined } from '@ant-design/icons';
import { Form } from '@unform/web';
import { Modal, Spin } from 'antd';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import setaDireita from '../../assets/icons/seta-direita.png';
import logo from '../../assets/logo/Logo.png';
import Checkbox from '../../components/Checkbox';
import Input from '../../components/Input';
import { signInRequest } from '../../store/modules/auth/actions';
import { getCookie } from '../../utils/getCookie';
import './styles.scss';

function SignIn() {
  const formRef = useRef();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [cook, setCook] = React.useState(null);

  React.useEffect(() => {
    const csrftoken = getCookie('csrftoken');

    setCook(csrftoken);
    console.log(csrftoken);
  }, []);

  const checkboxOptions = [
    { id: 'lembrar', value: 'lembrar', label: 'Lembrar' },
  ];

  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#000' }} spin />;

  const handleFormSubmit = async (data) => {
    const schemaValidate = Yup.object().shape({
      password: Yup.string().required('O campo Senha é obrigatório'),
      email: Yup.string().email('Digite um email válido').required('O campo Email é obrigatório'),
    });

    try {
      await schemaValidate.validate(data, { abortEarly: false });
      dispatch(signInRequest(data.email, data.password));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        Modal.error({
          title: 'Erro de validação',
          content: (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {err.errors.map((erro) => (
                <span>
                  {erro}
                  {' '}
                </span>
              ))}
            </div>
          ),
        });
      }
    }
  };

  return (
    <div className="SignInContainer">
      <main className="SignInContent">
        <section className="logoContainer">
          <img src={logo} alt="wirelink" className="signInLogo" />
        </section>
        <section className="signInCardContainer">
          <div className="cardTitle">
            <h1>Minha</h1>
            <strong>Wirelink</strong>
          </div>

          <Form classsName="form" ref={formRef} onSubmit={handleFormSubmit} style={{ width: '100%' }}>
            <input type="hidden" name="csrfmiddlewaretoken" value={cook} />
            <Input label="Login" name="email" type="text" />
            <Input label="Senha" name="password" type="password" />
            <Checkbox name="checkbox" options={checkboxOptions} />
            <button type="submit" className="cardButton">
              {loading ? <Spin indicator={antIcon} /> : (
                <>
                  CONECTE - SE
                  <img src={setaDireita} alt="seta-direita" />
                </>
              )}
            </button>
          </Form>
          <div className="signInEsqueciSenha">
            <span>
              Esqueceu o
              {' '}
              <Link to="/forgetPass">usuário/senha</Link>
              {' '}
              ?
            </span>
          </div>
          <Link className="cardButton" to="/cadastro">
            SOLICITAR SEU ACESSO
            <img src={setaDireita} alt="seta-direita" />
          </Link>
        </section>
      </main>
    </div>
  );
}

export default SignIn;
