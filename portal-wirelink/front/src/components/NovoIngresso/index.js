import { LoadingOutlined } from '@ant-design/icons';
import { Form } from '@unform/web';
import { Modal, Spin, Upload } from 'antd';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import arquivo from '../../assets/icons/arquivo.png';
import enviar from '../../assets/icons/enviar.png';
import voltar from '../../assets/icons/voltar.png';
import { navigate } from '../../store/modules/navigation/actions';
import Input from '../Input';
import Select from '../Select';
import Textarea from '../TextArea';
import api from '../../services/api';
import './styles.scss';
import phoneMask from '../../utils/phoneMask';

const selectCategory = [
  { value: '175', label: 'Velocidade Contratada' },
  { value: '177', label: 'Aplicação específica' },
  { value: '178', label: 'Horário específico' },
  { value: '179', label: 'Site específico' },
  { value: '180', label: 'Velocidade fora do padrão' },
  { value: '183', label: 'Não Acessa Aplicação Específica' },
  { value: '184', label: 'Não Acessa Site Específico' },
  { value: '185', label: 'Oscilação' },
  { value: '186', label: 'Serviço inoperante' },
  { value: '265', label: 'Solicitação' },
];
const selectProduct = [
  { value: 'CDN', label: 'CDN' },
  { value: 'Cloud Connect', label: 'Cloud Connect' },
  { value: 'IP Dedicado', label: 'IP Dedicado' },
  { value: 'IP Transito', label: 'IP Transito' },
  { value: 'SafeLink Básico(IPS+Anti Vírus)', label: 'SafeLink Básico (IPS+Anti Vírus)' },
  { value: 'SafeLink Intermediário(Básico+Filtros+Redundância 4G)', label: 'SafeLink Intermediário (Básico + Filtros + Redundância 4G)' },
  { value: 'Transporte Lan to Lan', label: 'Transporte Lan to Lan' },
  { value: 'Transporte PTT', label: 'Transporte PTT' },
  { value: 'Voice Link', label: 'Voice Link' },
];
const selectEstados = [
  { value: 'AC', label: 'AC' },
  { value: 'AL', label: 'AL' },
  { value: 'AM', label: 'AM' },
  { value: 'AP', label: 'AP' },
  { value: 'BA', label: 'BA' },
  { value: 'CE', label: 'CE' },
  { value: 'DF', label: 'DF' },
  { value: 'ES', label: 'ES' },
  { value: 'GO', label: 'GO' },
  { value: 'MA', label: 'MA' },
  { value: 'MG', label: 'MG' },
  { value: 'MS', label: 'MS' },
  { value: 'MT', label: 'MT' },
  { value: 'PA', label: 'PA' },
  { value: 'PB', label: 'PB' },
  { value: 'PE', label: 'PE' },
  { value: 'PI', label: 'PI' },
  { value: 'PR', label: 'PR' },
  { value: 'RJ', label: 'RJ' },
  { value: 'RN', label: 'RN' },
  { value: 'RO', label: 'RO' },
  { value: 'RR', label: 'RR' },
  { value: 'RS', label: 'RS' },
  { value: 'SC', label: 'SC' },
  { value: 'SE', label: 'SE' },
  { value: 'SP', label: 'SP' },
  { value: 'TO', label: 'TO' },

];

function Ingresso() {
  const formRef = useRef();
  const dispatch = useDispatch();

  const selectedCompany = useSelector((state) => state.user.company);
  const profile = useSelector((state) => state.user.profile);

  const selectedCompanyReason = profile.companys.filter(
    (company) => company.id_wirelink === selectedCompany,
  )[0]?.reason;

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  // const [isUploadDone, setIsUploadDone] = useState(false);

  const [fileArray, setFileArray] = useState([]);
  const [auxFileArray, setAuxFileArray] = useState([]);

  const nomeRegex = RegExp(/^[a-zA-Z\u00C0-\u00FF ]*$/);
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#000' }} spin />;

  function handlePhoneMask() {
    formRef.current.setFieldValue('phone', phoneMask(formRef.current.getFieldValue('phone')));
  }
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const handleChange = (info) => {
    setLoading(true);
    const { fileList } = info;
    setFileArray(fileList);
    const auxFileList = fileList.map((item) => {
      const file = {
        tipo_arquivo: item.type,
        nome_arquivo: item.name,
      };
      getBase64(item.originFileObj, (content) => {
        const parsed64 = content.split('base64,', 2);
        // eslint-disable-next-line prefer-destructuring
        file.conteudo_arquivo = parsed64[1];
      });
      return file;
    });
    setAuxFileArray(auxFileList);
    setLoading(false);
    return true;
  };
  function beforeUpload(file) {
    const isLt2M = (file.size / 1024 / 1024) < 15;

    if (!isLt2M) {
      toast.error('O arquivo deve ter no máximo 15mb.');
      return Upload.LIST_IGNORE;
    }
    // return isJpgOrPng && isLt2M;
    return true;
  }
  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
  const handleDeleteFile = (file) => {
    const filterdFileArray = fileArray.filter((item) => item.nome_arquivo !== file.name);
    setFileArray(filterdFileArray);
  };

  const handleFormSubmit = async (data) => {
    setLoading2(true);

    const dataFormatted = {
      // eslint-disable-next-line radix
      tipo_servico: parseInt(data.category),
      produto: data.product,
      designacao: data.designacao,
      endereco: data.endereco,
      assunto: data.assunto,
      fila: 5,
      uf: data.state,
      email: 'sistemas@wirelink.com.br',
      razao_social: selectedCompanyReason,
      mensagem: data.descricao,
      nome_contato: data.responsavel,
      email_contato: data.email,
      telefone_contato: data.phone,
      attachment: auxFileArray,
    };

    console.log(data);
    const schemaValidate = Yup.object().shape({
      nome_contato: Yup.string().required('O campo Responsável é obrigatório')
        .matches(
          nomeRegex,
          'No campo Responsável, números ou caracteres especiais não são permitidos',
        ),
      telefone_contato: Yup.string().required('O campo Telefone é obrigatório'),
      email_contato: Yup.string().email('Digite um email válido')
        .required('O campo Email é obrigatório'),
      assunto: Yup.string().required('O campo Assunto é obrigatório'),
      uf: Yup.string().required('O campo Estado é obrigatório'),
      produto: Yup.string().required('O campo Produto é obrigatório'),
      mensagem: Yup.string().required('O campo Descrição é obrigatório'),
      // conteudo_arquivo: Yup.string().required('Nenhum arquivo selecionado'),
    });

    try {
      await schemaValidate.validate(dataFormatted, { abortEarly: false });
      await api.post('/middleware/create_called/', dataFormatted);

      Modal.success({ title: 'Sucesso', content: 'Seu chamado foi criado' });
      dispatch(navigate('suporte'));
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
      } else {
        Modal.error({
          title: 'Ops!!',
          content: 'Ocorreu um erro ao tentar salvar seu chamado, tente novamente mais tarde.',
        });
      }
    } finally {
      setLoading2(false);
    }
  };
  return (
    <div className="ingressoContainer">
      <header className="ingressoHeader">
        <div className="tituloPagina">
          <div className="detalhe"> </div>
          <h1>Últimos Tickets</h1>
        </div>
        <button
          type="button"
          className="headerCancelButton"
          onClick={() => dispatch(navigate('suporte'))}
        >
          <span>CANCELAR</span>
          <img src={voltar} alt="voltar" />
        </button>
      </header>
      <div className="ingressoContent">
        <span className="ingressoTitle">Novo Cadastro</span>
        <Form ref={formRef} onSubmit={handleFormSubmit} style={{ width: '70%' }}>
          <Input cor="branco" label="Responsável pela solicitação*" name="responsavel" type="text" style={{ backgroundColor: '#fff' }} defaultValue={`${profile?.name} ${profile?.surname}`} />
          <div className="inputGroup">
            <Input cor="branco" label="Telefone*" name="phone" type="text" style={{ backgroundColor: '#fff' }} />
            {/* onChange={handlePhoneMask} */}
            <Input cor="branco" label="E-mail*" name="email" type="text" style={{ backgroundColor: '#fff' }} defaultValue={localStorage.getItem('wirelink::user::email')} />
          </div>
          <Input cor="branco" label="Assunto" name="assunto" type="text" style={{ backgroundColor: '#fff' }} />
          <Select label="Categoria*" placeholder="Escolha a categoria da sua solicitação" name="category" options={selectCategory} defaultValue={selectCategory[0].value} />

          <div className="inputGroup">
            <Select label="Estado*" placeholder="Escolha o estado da ocorrência" name="state" options={selectEstados} defaultValue={selectEstados[0].value} />
            <Select label="Qual Produto?*" placeholder="Escolha o produto" name="product" options={selectProduct} defaultValue={selectProduct[0].value} />
          </div>
          <Textarea cor="branco" label="Descrição*" name="descricao" type="text" rows="4" style={{ backgroundColor: '#fff' }} />
          <Input cor="branco" label="Designação" name="designacao" type="text" style={{ backgroundColor: '#fff' }} />
          <Input cor="branco" label="Endereço / Localidade" name="endereco" type="text" style={{ backgroundColor: '#fff' }} />
          <span id="legenda">Os campos com * são obrigatórios.</span>
          <div className="formButtons">
            <div className="buttonsGroup">
              <Upload
                name="arq"
                customRequest={dummyRequest}
                beforeUpload={() => beforeUpload}
                onChange={handleChange}
                maxCount={3}
                multiple
                onRemove={handleDeleteFile}
                fileList={fileArray}
              >
                <button type="button">
                  {loading ? 'Carregando...' : 'ESCOLHER ARQUIVO'}
                  <img src={arquivo} alt="arquivo" />
                </button>
                {fileArray.length === 0 && <span>Nenhum Arquivo Selecionado</span>}
                {fileArray.length === 0 && <br />}
                {fileArray.length === 0 && <span>Extensões Aceitas: pdf, png, docx, etc.</span>}
                {fileArray.length === 0 && <span>Limite de 3 anexos, máximo 15mb</span>}
              </Upload>
            </div>

            <button type="submit">
              {loading2 ? <Spin indicator={antIcon} /> : 'ENVIAR'}
              <img src={enviar} alt="enviar" />
            </button>
          </div>
        </Form>
      </div>

    </div>
  );
}

export default Ingresso;
