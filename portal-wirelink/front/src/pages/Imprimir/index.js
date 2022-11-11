/* eslint-disable react/react-in-jsx-scope */
import { Collapse, Modal } from 'antd';
import { useEffect, useState } from 'react';
import Printer from 'react-pdf-print';
import { useParams, useLocation } from 'react-router-dom';
import {
  Document, Page, Text, pdf, StyleSheet, Font, View,
} from '@react-pdf/renderer';
import conversa from '../../assets/icons/conversa.png';
import imprimir from '../../assets/icons/imprimir.png';
import setaae from '../../assets/icons/setaae.png';
import tag from '../../assets/icons/tag.png';
import api from '../../services/api';
import poppinsBold from '../../assets/fonts/Poppins/Poppins-Bold.ttf';
import poppinsMedium from '../../assets/fonts/Poppins/Poppins-Medium.ttf';
import pdfStyles from './pdfStyles';
import './styles.scss';

function Imprimir() {
  const { Panel } = Collapse;
  const { ticket: ticketId } = useParams();
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);
  const [chamados, setChamados] = useState([]);
  const [isPDFLoading, setIsPDFLoading] = useState(false);

  const { confirm } = Modal;

  function destroyAll() {
    Modal.destroyAll();
  }

  const handlePDFDownload = async (filename, array) => {
    setIsPDFLoading(true);
    const PDFstyles = StyleSheet.create(pdfStyles);
    const qParamsAux = search.replace('?', '');
    const params = qParamsAux.split('&');

    const title = decodeURIComponent(params[0].split('=')[1]);
    const ticket = decodeURIComponent(params[1].split('=')[1]);
    const queue = decodeURIComponent(params[2].split('=')[1]);
    const status = decodeURIComponent(params[3].split('=')[1]);

    Font.register({ family: 'Poppins-Bold', src: poppinsBold });
    Font.register({ family: 'Poppins-Medium', src: poppinsMedium });

    const GeneratedPDF = (
      <Document>
        <Page style={PDFstyles.body}>
          <View style={PDFstyles.header}>
            <View style={PDFstyles.infoHeader}>
              <Text>
                Informações
              </Text>
            </View>
            <View style={PDFstyles.infoHeaderContent}>
              <View style={PDFstyles.infoHeaderContentText}>
                <Text>
                  {'N° do Ticket: '}
                </Text>
                <Text style={{ color: '#FBE91B' }}>
                  {ticket}
                </Text>
              </View>
              <View style={PDFstyles.infoHeaderContentText}>
                <Text>
                  {'Fila: '}
                </Text>
                <Text style={{ color: '#FBE91B' }}>
                  {queue || 'Não informado'}
                </Text>
              </View>
              <View style={PDFstyles.infoHeaderContentText}>
                <Text>
                  {'Estado: '}
                </Text>
                <Text style={{ color: '#FBE91B' }}>
                  {status}
                </Text>
              </View>
            </View>
          </View>

          <View style={PDFstyles.contentHeader}>
            <Text>
              {title}
            </Text>
          </View>
          <View style={PDFstyles.ticketsContainer}>
            {
            array.length > 0 && array.map((chamado, index) => (
              <View key={index} wrap={false}>
                <View style={[PDFstyles.ticketHeader, { color: '#373D3E' }]}>
                  <Text style={{ maxWidth: 425 }}>
                    {chamado.origem}
                  </Text>
                  <Text>
                    {chamado.data_criacao}
                  </Text>
                </View>
                <View style={PDFstyles.ticketSubject}>
                  <View>
                    <View
                      style={[PDFstyles.infoHeaderContentText, { fontSize: 10, marginLeft: 5 }]}
                    >
                      <Text>
                        {'De: '}
                      </Text>
                      <Text style={{ color: '#FBE91B' }}>
                        {chamado.origem}
                      </Text>
                    </View>
                    <View
                      style={[PDFstyles.infoHeaderContentText, { fontSize: 10, marginLeft: 5 }]}
                    >
                      <Text>
                        {'Para: '}
                      </Text>
                      <Text style={{ color: '#FBE91B' }}>
                        {'Suporte Wirelink '}
                      </Text>
                    </View>
                    <View
                      style={{
                        fontSize: 10,
                        marginLeft: 5,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'left',
                        maxWidth: 420,
                      }}
                    >
                      <Text>
                        {'Assunto: '}
                      </Text>
                      <Text style={{ color: '#FBE91B' }}>
                        {`[ Ticket # ${ticket} ] ${chamado.assunto}`}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={PDFstyles.ticketMessage} wrap={false}>
                  <Text style={{ color: '#007BFF', fontSize: 12 }}>
                    Mensagem:
                  </Text>
                  <Text style={{ color: '#373D3E', fontSize: 10, marginTop: 10 }}>
                    {chamado.mensagem}
                  </Text>
                </View>
              </View>
            ))
          }
          </View>
        </Page>
      </Document>
    );

    const blob = await pdf(GeneratedPDF).toBlob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    setIsPDFLoading(false);
    link.click();
    link.remove();
  };

  function showConfirm(array) {
    confirm({
      title: `Gostaria de imprimir as mensagens relacionadas ao Ticket ${ticketId}?`,
      content: 'Será gerado um arquivo PDF contendo todo o histórico de mensagens relacionado à esse ticket.',
      onOk() {
        return new Promise(() => {
          destroyAll();
          handlePDFDownload(`historico-${ticketId}.pdf`, array);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }

  async function getTicketInfo() {
    try {
      const response = await api.get(`middleware/get_called_id?id_chamado=${ticketId}`);
      setChamados(response.data);
      setLoading(false);
      showConfirm(response.data);
    } catch (error) {
      setLoading(false);
      Modal.error({ title: 'Ops!!', content: 'Erro ao buscar atendimentos' });
      setChamados([]);
    }
  }

  useEffect(() => {
    getTicketInfo();
  }, []);

  return (
    <div className="historicoContainer">
      <div className="infoContainer">
        <div className="historicoTitle">
          <div>
            <img src={tag} alt="tag" />
            <span>
              Ticket:
              {' '}
              {ticketId}
            </span>
          </div>
          {loading === false && (
            <button
              type="button"
              disabled={isPDFLoading}
              onClick={() => handlePDFDownload(`historico-${ticketId}.pdf`, chamados)}
            >
              <img src={imprimir} alt="imprimir" />
            </button>
          )}
        </div>

        <Printer>
          <div id={1}>
            <Collapse activeKey={[...Array(100).keys()]}>
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
                          teste@teste.com
                        </span>
                      </div>
                      <span className="static">Assunto:</span>
                      <span>
                        [ Ticket #
                        {' '}
                        {ticketId}
                        {' '}
                        ]
                        {' '}
                        {chamado.assunto}
                      </span>
                    </div>
                    <div className="mailBody">
                      <div className="mailBodyReadyOnly">
                        <span>Mensagem:</span>
                        <p>
                          {chamado.mensagem}
                        </p>
                      </div>
                    </div>

                  </div>
                </Panel>
              ))}
            </Collapse>
          </div>
        </Printer>
      </div>
    </div>
  );
}

export default Imprimir;
