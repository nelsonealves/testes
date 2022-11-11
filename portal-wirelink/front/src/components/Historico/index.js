/* eslint-disable max-len */
import { LoadingOutlined } from '@ant-design/icons';
import { Form } from '@unform/web';
import {
  Collapse, Modal, Spin, Upload,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import arquivo from '../../assets/icons/arquivo.png';
import conversa from '../../assets/icons/conversa.png';
import historico from '../../assets/icons/historico.png';
import imprimir from '../../assets/icons/imprimir.png';
import informacao from '../../assets/icons/info.png';
import pesquisar from '../../assets/icons/pesquisar.png';
import seta from '../../assets/icons/seta-direita.png';
import setaae from '../../assets/icons/setaae.png';
import tag from '../../assets/icons/tag.png';
import voltar from '../../assets/icons/voltar.png';
import api from '../../services/api';
import { navigate } from '../../store/modules/navigation/actions';
import Textarea from '../TextArea';
import './styles.scss';

function Historico() {
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const formRef = useRef();
  const [chamados, setChamados] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPDFLoading, setIsPDFLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [currentTicket, setCurrentTicket] = useState({});
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#000' }} spin />;
  const { record } = useSelector((state) => state.navigation.state);
  const user = useSelector((state) => state.user.profile);

  const [fileArray, setFileArray] = useState([]);
  const [auxFileArray, setAuxFileArray] = useState([]);

  useEffect(() => {
    async function getTicketInfo() {
      try {
        const response = await api.get(`middleware/get_called_id?id_chamado=${record.key}`);
        setChamados(response.data);
      } catch (error) {
        setChamados([]);
      }
    }
    getTicketInfo();
  }, []);

  const handleCancel = () => {
    setVisible(false);
    formRef.current.reset();
  };

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

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  function beforeUpload(file) {
    const isLt2M = (file.size / 1024 / 1024) < 15;

    if (!isLt2M) {
      toast.error('O arquivo deve ter no máximo 2mb.');
      return Upload.LIST_IGNORE;
    }
    // return isJpgOrPng && isLt2M;
    return true;
  }

  const handlePDFDownload = async () => {
    setIsPDFLoading(true);
    const body = {
      id_chamado: record.key,
      numero_ticket: record.tickets,
      titulo: record.title,
      data_abertura: record.data_abertura,
      data_encerramento: record.data_encerramento,
      status: record.state,
      fila: record.client,
    };

    await api.post(`middleware/download_pdf_chamado/?id_chamado=${record.key}`, body, { responseType: 'blob' }).then((response) => {
      const blob = response.data;
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${record.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
    setIsPDFLoading(false);
  };

  const handleAttachmentDownload = async (attch) => {
    await api.post('middleware/download_anexo/', attch, { responseType: 'blob' }).then((response) => {
      const blob = response.data;
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', attch.filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };

  const handleDeleteFile = (file) => {
    const filterdFileArray = fileArray.filter((item) => item.nome_arquivo !== file.name);
    setFileArray(filterdFileArray);
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);
    const dataFormatted = {
      id: record.key,
      assunto: currentTicket.assunto,
      mensagem: data.message,
      nome_contato: user.name,
      attachment: auxFileArray,
    };

    const schemaValidate = Yup.object().shape({
      // assunto: Yup.string().required('O campo Assunto é obrigatório'),
      mensagem: Yup.string().required('O campo Mensagem é obrigatório'),
    });

    try {
      await schemaValidate.validate(dataFormatted, { abortEarly: false });
      await api.patch('middleware/update_called/', dataFormatted);

      Modal.success({ title: 'Sucesso!!', content: 'Sua mensagem foi enviada.' });
      setVisible(false);
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
        Modal.error({ title: 'Ops!!', content: 'Ocorreu um erro ao enviar sua mensagem, tente novamente mais tarde.' });
      }
    } finally {
      setLoading(false);
      dispatch(navigate('suporte'));
    }
  };

  return (
    <div className="historicoContainer">
      <header className="historicoHeader">
        <div className="tituloPagina">
          <div className="tituloDetalhe">
            <div className="detalhe"> </div>
            <h1>Últimos Tickets</h1>
          </div>
          <button
            type="button"
            className="backButton"
            onClick={() => dispatch(navigate('suporte'))}
          >
            <span>X</span>
          </button>
        </div>
        <div className="headerSub">
          <div className="historicoChamado">
            <img src={historico} alt="historico" />
            <h2>
              Histórico do Chamado:
              <span>{record.tickets}</span>
            </h2>
          </div>
          <div className="pesquisar">
            <label htmlFor="pesquisar">
              <img src={pesquisar} alt="pesquisar" />
            </label>
            <input
              id="pesquisar"
              type="text"
              placeholder="Pesquisar"
              value={search}
              onChange={(e) => { setSearch(e.target.value); }}
            />
          </div>
        </div>
      </header>
      <div className="historicoInfo">
        <div className="infoHeader">
          <img src={informacao} alt="info" />
          <span>Informações</span>
        </div>
        <div className="infoContent">
          <span>
            N° do Ticket:
            {' '}
            <span className="infoValor">
              {record.tickets}
            </span>
          </span>
          <span>
            Fila:
            {' '}
            <span className="infoValor">
              {record.client || 'Não informado'}
            </span>
          </span>
          <span>
            Estado:
            {' '}
            <span className="infoValor">
              {record.state}
            </span>
          </span>
        </div>
      </div>
      <div className="infoContainer">
        <div className="historicoTitle">
          <div>
            <img src={tag} alt="tag" />
            <span>{record.title}</span>
          </div>
          <button
            type="button"
            disabled={isPDFLoading}
            onClick={async () => handlePDFDownload()}
          >
            <img src={imprimir} alt="imprimir" />
          </button>
        </div>
        <div id={1}>
          <Collapse>
            {chamados.length > 0 && chamados.map((chamado, index) => (
              <Panel
                showArrow={false}
                header={(
                  <div className="infoCard">
                    <div className="infoCardEsq">
                      <img src={conversa} alt="conversa" />
                      <span>{chamado.origem}</span>
                    </div>
                    <div className="infoCardDir">
                      <span>{chamado.data_criacao}</span>
                      <img src={setaae} alt="setaae" />
                    </div>
                  </div>
                )}
                key={index}
              >
                <div className="mailContainer">
                  <div className="mailHeader">
                    <div>
                      <span>
                        {' '}
                        <span className="static">De:</span>
                        {' '}
                        {chamado.origem}
                      </span>
                      <span>
                        <span className="static">Para:</span>
                        {' '}
                        Suporte Wirelink
                      </span>
                    </div>
                    <span className="static">Assunto:</span>
                    <span>
                      [ Ticket #
                      {' '}
                      {record.tickets}
                      {' '}
                      ]
                      {' '}
                      {chamado.assunto}

                    </span>
                  </div>
                  <div className="mailBody">
                    {visible ? (
                      <div className="mailBodyWrite">
                        <Form ref={formRef} onSubmit={handleFormSubmit} style={{ width: '95%' }}>
                          {/* <Input label="Assunto*" name="assunto" type="text" style={{ backgroundColor: '#fff', width: '40%' }} /> */}
                          <Textarea placeholder="Digite sua mensagem..." name="message" type="text" rows="10" style={{ backgroundColor: '#fff' }} />
                          {/* <span id="legenda">Os campos com * são obrigatórios.</span> */}
                          <div className="formButtons">
                            <div className="buttonsGroup">
                              <div className="upload">
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
                                </Upload>
                                <div style={{ margin: '5px 0' }}>
                                  {fileArray.length === 0 && <span>Nenhum Arquivo Selecionado</span>}
                                  {fileArray.length === 0 && <br />}
                                  {fileArray.length === 0 && <span>Extensões Aceitas: pdf, png, docx, etc.</span>}
                                  {fileArray.length === 0 && <br />}
                                  {fileArray.length === 0 && <span>Limite de 3 anexos, máximo 15mb</span>}
                                </div>
                              </div>
                            </div>
                            <div className="buttonsAcoes">
                              <button className="voltar" type="button" onClick={handleCancel}>
                                CANCELAR
                                <img src={voltar} alt="voltar" />
                              </button>
                              <button className="enviar" type="submit">
                                {loading ? <Spin indicator={antIcon} /> : 'ENVIAR'}
                                <img src={seta} alt="enviar" />
                              </button>
                            </div>
                          </div>
                        </Form>
                      </div>

                    )
                      : (
                        <>
                          <div className="mailBodyReadyOnly">
                            <span>Mensagem:</span>
                            <p>
                              {chamado.mensagem}
                            </p>
                            {
                            record.state !== 'ENCERRADO' && record.state !== 'CANCELADO' && user.access_type !== 'consultor'
                            && (
                              <button
                                type="button"
                                className="mailResponseButton"
                                onClick={() => {
                                  setVisible(true);
                                  setCurrentTicket(chamado);
                                }}
                              >
                                RESPONDER
                                <img src={seta} alt="responder" />
                              </button>
                            )
                          }
                            {chamado.filename && chamado.filename !== 'file-2' && (
                            <div className="ant-upload-list ant-upload-list-text" style={{ maxWidth: 300 }}>
                              <div className="ant-upload-list-text-container">
                                <div className="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-text">
                                  <div className="ant-upload-list-item-info">
                                    <span className="ant-upload-span">
                                      <div className="ant-upload-text-icon">
                                        <span role="img" aria-label="paper-clip" className="anticon anticon-paper-clip">
                                          <svg viewBox="64 64 896 896" focusable="false" data-icon="paper-clip" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                            <path d="M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1A172.22 172.22 0 00174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7 44.4 0 88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c.1-64.6-25.1-125.3-70.7-170.9z" />
                                          </svg>
                                        </span>
                                      </div>

                                      {['application/pdf'].includes(chamado.tipo) && (
                                        <button
                                          type="button"
                                          className="ant-upload-list-item-name"
                                          title={chamado.filename}
                                          onClick={() => {
                                            const pdfWindow = window.open('');
                                            pdfWindow.document.write(
                                              `<iframe width="100%" height="100%" src="data:application/pdf;base64,${chamado.conteudo.replace('dataapplication/pdfbase64', '').replace('data:application/pdf;base64,', '')}"></iframe>`,
                                            );
                                          }}
                                        >
                                          {chamado.filename}
                                        </button>
                                      )}

                                      {['image/png', 'image/jpeg'].includes(chamado.tipo) && (

                                        <button
                                          type="button"
                                          className="ant-upload-list-item-name"
                                          title={chamado.filename}
                                          onClick={() => {
                                            const imageWindow = window.open('');
                                            imageWindow.document.write(
                                              `<img src="data:${chamado.tipo};base64,${chamado.conteudo.replace('dataimage/pngbase64', '').replace('dataimage/jpegbase64', '')}" alt="${chamado.filename}" />`,
                                            );
                                          }}
                                        >
                                          {chamado.filename}
                                        </button>
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            )}
                          </div>
                          {
                          chamado.anexos && chamado.anexos.length > 0
                            ? (
                              <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                              }}
                              >
                                {
                                chamado?.anexos.map((item) => (
                                  <button
                                    type="button"
                                    key={item.article_id}
                                    onClick={() => handleAttachmentDownload(item)}
                                    className="button_anexo"
                                  >
                                    {item.filename}
                                  </button>
                                ))
                              }
                              </div>
                            )
                            : (<span />)
                        }
                        </>
                      )}
                  </div>

                </div>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default Historico;
