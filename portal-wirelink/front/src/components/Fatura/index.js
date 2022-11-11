import {
  message, Modal, Table, Tooltip,
} from 'antd';
import React, {
  useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import XMLParser from 'react-xml-parser';
import { toast } from 'react-toastify';
import boleto from '../../assets/icons/boleto.png';
import notas from '../../assets/icons/notas.png';
import pesquisar from '../../assets/icons/pesquisar.png';
import api from '../../services/api';
import formatData from '../../utils/formatData';
import formatValue from '../../utils/formatValue';
import Boleto from './Boleto';
import NotaFiscal from './NotaFiscal';
import './styles.scss';

function Suporte() {
  // eslint-disable-next-line no-unused-vars
  const [sortedInfo, setSortedInfo] = useState({});
  const [faturas, setFaturas] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [faturasRaw, setFaturasRaw] = useState([]);
  const [xmlNF, setxmlNF] = useState(null);
  const [selectedNf, setSelectedNf] = useState(null);
  const [selectedB, setSelectedB] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const selectedCompany = useSelector((state) => state.user.company);

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedNf(null);
  };
  const handleCancel2 = () => {
    setIsModalVisible2(false);
    setSelectedB(null);
  };

  async function getboletos() {
    try {
      const response = await api.get(`/middleware/get_tickets?id=${selectedCompany}`);
      if ((response.data.result)) {
        throw new Error('Não existem faturas para esse usuário');
      } else {
        const dataFormatted = response.data.map((fatura) => ({
          key: fatura.numero_titulo,
          code: fatura.numero_titulo,
          service: fatura.servico,
          emissao: formatData(fatura.emissao.split(' ')[0]),
          vencimento: formatData(fatura.vencimento.split(' ')[0]),
          valor: formatValue(fatura.valor),
          barCode: fatura.codigo_barras,
          boleto: 'falta info',
          notas: 'falta info',
        }));
        setFaturasRaw(response.data);
        setFaturas(dataFormatted);
      }
    } catch (error) {
      console.error({ title: 'Ops!!', content: error.message });
      setFaturas([]);
    }
  }

  useEffect(() => {
    getboletos();
  }, [selectedCompany]);

  useEffect(() => {
    if (selectedB) {
      setIsModalVisible2(true);
    }
  }, [selectedB]);

  useEffect(() => {
    async function getNotas() {
      try {
        const response2 = await api.get(`/middleware/get_invoice?numero_titulo=${selectedNf}`);
        if (response2.data.nota_servico.xml) {
          const xml = new XMLParser().parseFromString(response2.data.nota_servico.xml);
          setxmlNF(xml);
          setIsModalVisible(true);
        } else {
          Modal.error({ title: 'Ops!!', content: 'Nota fiscal nao disponível.' });
        }
      } catch (error) {
        Modal.error({ title: 'Ops!!', content: error.message });
        setFaturas([]);
      }
    }
    if (selectedNf) {
      getNotas();
    }
  }, [selectedNf]);

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const searchTable = (s) => {
    const filteredData = [];
    if (s.length === 0) {
      return getboletos();
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < faturas.length; ++i) {
      const newValue = s;

      const fat = faturas[i];

      if (fat.code.toUpperCase().includes(newValue.toUpperCase())
      || fat.service.toUpperCase().includes(newValue.toUpperCase())
      ) {
        filteredData.push(faturas[i]);
      }
    }
    return setFaturas(filteredData);
  };

  const updateSearch = (query) => {
    searchTable(query);
  };

  const columns = [
    {
      title: (<span className="column-title">Código</span>),
      dataIndex: 'code',
      key: 'code',
      width: 100,
      sorter: (a, b) => a.code - b.code,
      ellipsis: true,
      render: (text) => (
        <div className="tableCell ticketsCell">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: (<span className="column-title">Serviço</span>),
      dataIndex: 'service',
      key: 'service',
      render: (text) => (
        <div className="tableCell" style={{ fontSize: '0.8rem' }}>
          <Tooltip title={text} color="#42b0f9">
            <span>{text}</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: (<span className="column-title">Emissão</span>),
      dataIndex: 'emissao',
      key: 'emissao',
      sorter: (a, b) => new Date(b.emissao) - new Date(a.emissao),
      width: 110,
      render: (text) => (
        <div className="tableCell" style={{ fontSize: '0.8rem' }}>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: (<span className="column-title">Vencimento</span>),
      dataIndex: 'vencimento',
      key: 'vencimento',
      sorter: (a, b) => new Date(b.vencimento) - new Date(a.vencimento),
      width: 110,
      render: (text) => (
        <div className="tableCell">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: (<span className="column-title">Valor</span>),
      dataIndex: 'valor',
      key: 'valor',
      width: 140,
      render: (text) => (
        <div className="tableCell">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: (<span className="column-title">Código de Barras</span>),
      dataIndex: 'barCode',
      key: 'barCode',
      render: (text) => (
        <button
          type="button"
          className="tableCell"
          onClick={() => {
            navigator.clipboard.writeText(text);
            message.success('Copiado');
          }}
        >
          <Tooltip title={text} color="#42b0f9">
            <span>{text}</span>
          </Tooltip>
        </button>
      ),
    },
    {
      title: (<span className="column-title">Boleto</span>),
      dataIndex: 'boleto',
      key: 'boleto',
      width: 80,
      render: (text, a) => (
        <button
          type="button"
          className="noteButton"
          onClick={async () => {
            try {
              window.open(`${process.env.REACT_APP_API_URL}/middleware/get_pdf_boleto?numero_titulo=${a.code}`);
            } catch {
              toast('Boleto não encontrado');
            }
          }}
        >
          <img src={boleto} alt={text} />
        </button>
      ),
    },
    {
      title: (<span className="column-title">Notas</span>),
      dataIndex: 'notas',
      key: 'notas',
      width: 80,
      render: (text, a) => (
        <button
          type="button"
          className="noteButton"
          onClick={async () => {
            try {
              window.open(`${process.env.REACT_APP_API_URL}/middleware/get_pdf_nota?numero_titulo=${a.code}`);
            } catch (error) {
              toast('Boleto não encontrado');
            }
          }}
        >
          <img src={notas} alt={text} />
        </button>
      ),
    },
  ];
  return (
    <div className="faturaContainer">
      <header>
        <div className="headerTitulo">
          <div className="tituloPagina">
            <div className="detalhe"> </div>
            <h1>Faturas</h1>
          </div>
          <div className="pesquisar">
            <label htmlFor="pesquisar">
              <img src={pesquisar} alt="pesquisar" />
            </label>
            <input
              id="pesquisar"
              type="text"
              placeholder="Pesquisar"
              onChange={(e) => updateSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="headerContent"> </div>
      </header>
      <div className="faturaTable">
        <Modal
          visible={isModalVisible}
          onCancel={handleCancel}
          width={1000}
          bodyStyle={{
            padding: 0,
          }}
          footer={false}
          closable={false}
          destroyOnClose
        >
          {xmlNF && (
            <NotaFiscal xmlNF={xmlNF} />
          )}
        </Modal>
        <Modal
          visible={isModalVisible2}
          onCancel={handleCancel2}
          width={1000}
          bodyStyle={{
            padding: 0,
          }}
          footer={false}
          closable={false}
          destroyOnClose
        >
          {selectedB && (
            <Boleto selectedB={selectedB} />
          )}
        </Modal>
        <Table
          columns={columns}
          dataSource={faturas}
          onChange={handleChange}
          pagination={{
            position: ['topLeft'],
            showSizeChanger: true,
          }}
        />
      </div>

    </div>
  );
}

export default Suporte;
