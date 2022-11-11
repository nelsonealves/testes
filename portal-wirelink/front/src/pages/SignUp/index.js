import React, { useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { signUpRequest } from '../../store/modules/auth/actions';
import Select from '../../components/Select';
import Input from '../../components/Input';
import setaDireita from '../../assets/icons/seta-direita.png';
import setaVoltar from '../../assets/icons/voltar.png';
import logo from '../../assets/logo/Logo.png';
import './styles.scss';

function SignUp({ history }) {
  const formRef = useRef();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#000' }} spin />;
  const nomeRegex = RegExp(/^[a-zA-Z\u00C0-\u00FF ]*$/);
  const selectOptions = [
    { value: 'Administrador', label: 'Administrador' },
    { value: 'Financeiro', label: 'Financeiro' },
    { value: 'Técnico', label: 'Técnico' },
    { value: 'Consultor', label: 'Consultor' },
  ];
  const handleFormSubmit = async (data) => {
    console.table(data);
    const schemaValidate = Yup.object().shape({
      name: Yup.string().required('O campo Nome é obrigatório').matches(nomeRegex, 'No campo Nome números não são permitidos'),
      cnpj: Yup.string().required('O campo CNPJ é obrigatório'),
      role: Yup.string().required('O campo Tipo de Acesso é obrigatório'),
      razao: Yup.string().required('O campo Razão é obrigatório').matches(nomeRegex, 'No campo Razão números não são permitidos'),
      email: Yup.string().email('Digite um email válido').required('O campo Email é obrigatório'),
      password: Yup.string().required('O campo Senha é obrigatório'),

    });
    try {
      await schemaValidate.validate(data, { abortEarly: false });
      dispatch(signUpRequest(
        data.name,
        data.cnpj,
        data.razao,
        data.email,
        data.password,
        data.role,
      ));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        Modal.error({
          title: 'Erro de validação',
          content: (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {err.errors.map((erro, index) => (
                <span key={index}>
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
  function handleMaskInput() {
    formRef.current.setFieldValue('cnpj',
      formRef.current.getFieldValue('cnpj')
        .replace(/(^\d{2})((\d))$/, '$1.$2')
        .replace(/(^\d{2})\.(\d{3})((\d))$/, '$1.$2.$3')
        .replace(/(^\d{2})\.(\d{3})\.(\d{3})((\d))$/, '$1.$2.$3/$4')
        .replace(/(^\d{2})\.(\d{3})\.(\d{3})\/(\d{4})((\d))$/, '$1.$2.$3/$4-$5'));
  }

  return (
    <div className="SignUpContainer">
      <main className="SignUpContent">
        <section className="logoContainer">
          <img src={logo} alt="wirelink" className="signUpLogo" />
        </section>
        <section className="signUpCardContainer">
          <h1 className="cardTitle">Solicitar Acesso</h1>
          <Form ref={formRef} onSubmit={handleFormSubmit} style={{ width: '100%' }}>
            <Input label="Nome" name="name" type="text" />
            <Input label="CNPJ" name="cnpj" maxLength="18" onChange={() => handleMaskInput} />
            <Input label="Razão" name="razao" type="text" />
            <Input label="E-mail" name="email" type="text" />
            <Input label="Senha" name="password" type="password" />
            <Select className="escuro" label="Tipo de Acesso" placeholder="Tipo de Acesso" name="role" options={selectOptions} defaultValue={selectOptions[0].value} />
          </Form>
          <div className="signUpCardButtonsContainer">
            <button type="submit" className="signUpCardCancelButton" onClick={() => history.goBack()}>
              CANCELAR
              <img src={setaVoltar} alt="seta-voltar" />
            </button>
            <button type="submit" className="signUpCardCadastroButton" onClick={() => { formRef.current.submitForm(); }}>
              {loading ? <Spin indicator={antIcon} /> : (
                <>
                  ENVIAR INFORMAÇÕES
                  <img src={setaDireita} alt="seta-direita" />
                </>
              )}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignUp;
