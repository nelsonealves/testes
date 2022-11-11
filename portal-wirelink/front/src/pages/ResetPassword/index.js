import { Form } from '@unform/web';
import { Modal } from 'antd';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import setaDireita from '../../assets/icons/seta-direita.png';
import logo from '../../assets/logo/Logo.png';
import Input from '../../components/Input';
import api from '../../services/api';
import './styles.scss';

function ResetPass() {
  const formRef = useRef();

  const handleFormSubmit = async (data) => {
    try {
      await api.post('api/user/recovery_password/', { email: data.email });
      Modal.success({ title: 'Sucesso', content: 'Sua solicitação foi encaminhada para nossos atendentes aguarde o contato.' });
    } catch (error) {
      Modal.error({ title: 'Ops!!', content: 'Sua solicitação não pode ser encaminhada, tente novamente.' });
    }
  };
  return (
    <div className="resetContainer">
      <main className="resetContent">
        <section className="logoContainer">
          <img src={logo} alt="wirelink" className="resetLogo" />
        </section>
        <section className="resetCardContainer">
          <h1 className="cardTitle">Redefinir Senha</h1>
          <span className="cardDescription"> Digite o seu nome de usuário ou endereço de e-mail.</span>
          <span className="cardDescription">Você receberá um e-mail com instruções sobre como redefinir a sua senha.</span>
          <Form className="form" ref={formRef} onSubmit={handleFormSubmit} style={{ width: '100%' }}>
            <Input label="Login" name="email" type="text" />
            <button type="submit" className="cardResetButton">
              REDEFINIR
              <img src={setaDireita} alt="seta-direita" />
            </button>
          </Form>
          <div className="links">
            <Link to="/cadastro">
              Cadastro
            </Link>
            <span>|</span>
            <Link to="/login">
              Login
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ResetPass;
