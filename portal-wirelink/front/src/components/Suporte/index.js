/* eslint-disable no-underscore-dangle */
import {
  Table,
  Modal,
  Button,
  DatePicker,
} from 'antd';
import 'moment/locale/pt-br';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/pt_BR';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';
import add from '../../assets/icons/add.png';
import agendamento from '../../assets/icons/agendamento.png';
import andamento from '../../assets/icons/andamentob.png';
import cancelado from '../../assets/icons/canceladob.png';
import cliente from '../../assets/icons/cliente.png';
import encerrado from '../../assets/icons/encerrado.png';
import imprimir_preto from '../../assets/icons/imprimir_preto.png';
import eye from '../../assets/icons/olho.png';
import pesquisar from '../../assets/icons/pesquisar.png';
import validacao from '../../assets/icons/validacao.png';
import api from '../../services/api';
import { navigate } from '../../store/modules/navigation/actions';
import './styles.scss';

const { RangePicker } = DatePicker;

function Suporte() {
  const dispatch = useDispatch();
  const selectedCompany = useSelector((state) => state.user.company);
  const profile = useSelector((state) => state.user.profile);
  const selectedCompanyReason = profile.companys.filter(
    (company) => company.id_wirelink === selectedCompany,
  )[0]?.reason;
  const [atendimentos, setAtendimentos] = useState([]);
  const [ticketsToExport, setTicketsToExport] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  async function getSuportes() {
    try {
      const encodeReason = encodeURIComponent(selectedCompanyReason);
      const response = await api.get(`middleware/get_called?razao_social=${encodeReason}`, { headers: { Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8' } });

      const dataFormatted = response.data.map((chamado) => {
        const initialDateArray = chamado.data_abertura.split(' ')[0].split('/');
        const initialTimeArray = chamado.data_abertura.split(' ')[1].split(':');
        const finalDateArray = chamado.data_encerramento
          ? chamado.data_encerramento.split(' ')[0].split('/') : null;
        const finalTimeArray = chamado.data_encerramento
          ? chamado.data_encerramento.split(' ')[1].split(':') : null;

        const initialDate = moment([
          initialDateArray[2],
          initialDateArray[1] - 1,
          initialDateArray[0],
          initialTimeArray[0],
          initialTimeArray[1],
          initialTimeArray[2],
        ]);
        const finalDate = chamado.data_encerramento ? moment([
          finalDateArray[2],
          finalDateArray[1] - 1,
          finalDateArray[0],
          finalTimeArray[0],
          finalTimeArray[1],
          finalTimeArray[2],
        ]) : null;
        const durationAux = chamado.data_encerramento ? finalDate.diff(initialDate, 'seconds') : null;

        const hoursMinutesSecs = chamado.data_encerramento
          ? moment.utc(moment.duration(durationAux, 'seconds', true).asMilliseconds()).format('HH:mm:ss')
          : null;

        const days = chamado.data_encerramento
          ? Math.floor(moment.duration(durationAux, 'seconds').asDays())
          : null;

        return {
          key: chamado.id_chamado,
          tickets: chamado.numero_ticket,
          title: chamado.titulo,
          client: chamado.fila,
          data_abertura: chamado.data_abertura.split(' ')[0],
          data_encerramento: chamado.data_encerramento !== null ? chamado.data_encerramento.split(' ')[0] : '-',
          initial_date_obj: initialDate,
          final_date_obj: finalDate,
          duration: durationAux ? `${days}:${hoursMinutesSecs}` : '-',
          state: chamado.status,
        };
      });
      setAtendimentos(dataFormatted);
    } catch (error) {
      setAtendimentos([]);
    }
  }

  useEffect(() => {
    getSuportes();
  }, [selectedCompany]);

  const searchTable = (s) => {
    const filteredData = [];
    if (s.length === 0) {
      return getSuportes();
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < atendimentos.length; ++i) {
      const newValue = s;

      const user = atendimentos[i];

      if (user.title.toUpperCase().includes(newValue.toUpperCase())
      || user.client.toUpperCase().includes(newValue.toUpperCase())
      || user.tickets.includes(newValue)
      || user.state.toUpperCase().includes(newValue.toUpperCase())
      ) {
        filteredData.push(atendimentos[i]);
      }
    }
    return setAtendimentos(filteredData);
  };

  const updateSearch = (query) => {
    searchTable(query);
  };

  const columns = [
    {
      title: (<span className="column-title">Tickets</span>),
      dataIndex: 'tickets',
      key: 'tickets',
      width: 150,
      sorter: (a, b) => a.tickets - b.tickets,
      ellipsis: true,
      render: (text) => (
        <div className="tableCell ticketsCell">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: (<span className="column-title">Título</span>),
      dataIndex: 'title',
      width: 200,
      key: 'title',
      render: (text) => (
        <div className="tableCell" style={{ fontSize: '0.8rem' }}>
          <span>{text}</span>
          {/* <Tooltip title={text} color="#42b0f9">
            <span>{text}</span>
          </Tooltip> */}
        </div>
      ),
    },
    {
      title: (<span className="column-title">Fila</span>),
      dataIndex: 'client',
      key: 'client',
      width: 180,
      render: (text) => (
        <div className="tableCell" style={{ fontSize: '0.8rem' }}>
          <span>{text}</span>
          {/* <Tooltip title={text} color="#42b0f9">
            <span>{text}</span>
          </Tooltip> */}
        </div>
      ),
    },
    {
      title: (<span className="column-title">Abertura</span>),
      dataIndex: 'data_abertura',
      key: 'data_abertura',
      width: 110,
      sorter: (a, b) => {
        if (b.data_abertura === null || a.data_abertura) {
          return -1;
        }
        return new Date(b.data_abertura) - new Date(a.data_abertura);
      },
      render: (text) => (
        <div className="tableCell">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: (<span className="column-title">Encerramento</span>),
      dataIndex: 'data_encerramento',
      key: 'data_encerramento',
      width: 140,
      sorter: (a, b) => {
        if (b.data_encerramento === null || a.data_encerramento) {
          return -1;
        }
        return new Date(b.data_encerramento) - new Date(a.data_encerramento);
      },
      render: (text) => (
        <div className="tableCell">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: (<span className="column-title">Duração</span>),
      dataIndex: 'duration',
      key: 'duration',
      width: 140,
      render: (text) => (
        <div className="tableCell">
          <span title="DD:HH:MM:SS">{text}</span>
        </div>
      ),
    },
    {
      title: (<span className="column-title">Estado</span>),
      dataIndex: 'state',
      key: 'state',
      width: 124,
      render: (text) => {
        switch (text) {
          case 'ENCERRADO':
            return (
              <div className="stateCell">
                <img src={encerrado} alt="encerrado" />
                <span>{text}</span>
              </div>
            );
          case 'EM ANDAMENTO':
            return (
              <div className="stateCell andamento">
                <img src={andamento} alt="andamento" />
                <span>{text}</span>
                {/* <Tooltip title={text} color="#0153CE">
                  <span>{text}</span>
                </Tooltip> */}
              </div>
            );
          case 'PENDENTE AGENDAMENTO':
            return (
              <div className="stateCell agendamento">
                <img src={agendamento} alt="agendamento" />
                <span>{text}</span>
                {/* <Tooltip title={text} color="#ab79d6">
                  <span>{text}</span>
                </Tooltip> */}
              </div>
            );
          case 'PENDENTE CLIENTE':
            return (
              <div className="stateCell cliente">
                <img src={cliente} alt="cliente" />
                <span>Pendente Cliente</span>
                {/* <Tooltip title={text} color="#8bbce6">
                  <span>Pendente Cliente</span>
                </Tooltip> */}
              </div>
            );
          case 'PENDENTE VALIDAÇÃO':
            return (
              <div className="stateCell validacao">
                <img src={validacao} alt="validacao" />
                <span>{text}</span>
                {/* <Tooltip title={text} color="#ec7171">
                  <span>{text}</span>
                </Tooltip> */}
              </div>
            );
          case 'PENDENTE TERCEIROS':
            return (
              <div className="stateCell validacao">
                <img src={validacao} alt="validacao" />
                <span>{text}</span>
                {/* <Tooltip title={text} color="#ec7171">
                  <span>{text}</span>
                </Tooltip> */}
              </div>
            );
          case 'PENDENTE NEW WORLD':
            return (
              <div className="stateCell validacao">
                <img src={validacao} alt="validacao" />
                <span>{text}</span>
                {/* <Tooltip title={text} color="#ec7171">
                  <span>{text}</span>
                </Tooltip> */}
              </div>
            );
          case 'CANCELADO':
            return (
              <div className="stateCell cancelado">
                <img src={cancelado} alt="cancelado" />
                <span>{text}</span>
              </div>
            );

          default:
            return (
              <div className="stateCell">
                <img src={encerrado} alt="encerrado" />
                <span>{text}</span>
                {/* <Tooltip title={text} color="#42b0f9">
                  <span>{text}</span>
                </Tooltip> */}
              </div>
            );
        }
      },
    },
    {
      title: (<span className="column-title">Detalhes</span>),
      dataIndex: '',
      key: 'eye',
      width: 80,
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: (text, record) => (
        <button
          type="button"
          className="tableCell buttonVer"
          onClick={() => {
            dispatch(navigate('historico', { record }));
          }}
        >
          <img src={eye} alt="eye" />
        </button>
      ),
    },
  ];

  const headers = [
    { label: 'Chamado', key: 'tickets' },
    { label: 'Título', key: 'title' },
    { label: 'Fila', key: 'client' },
    { label: 'Abertura', key: 'data_abertura' },
    { label: 'Encerramento', key: 'data_encerramento' },
    { label: 'Duração', key: 'duration' },
    { label: 'Estado', key: 'state' },
  ];

  useEffect(() => {
    if (dateRange.length === 2) {
      const filteredArray = atendimentos.filter((item) => (
        item.initial_date_obj >= dateRange[0]._d
        && item.initial_date_obj <= dateRange[1]._d));
      setTicketsToExport(filteredArray);
    }
  }, [dateRange]);

  return (
    <div className="suporteContainer">
      <Modal
        visible={isExportModalOpen}
        title="Exportar atendimentos"
        footer={[
          <Button key="back" onClick={() => setIsExportModalOpen(false)}>
            Voltar
          </Button>,
          <CSVLink filename="atendimentos.csv" key="submit" data={ticketsToExport} headers={headers} target="_blank" className="ant-btn ant-btn-primary">
            Exportar
          </CSVLink>,
        ]}
        closable
        centered
        width={650}
        className="export-modal"
        onCancel={() => setIsExportModalOpen(false)}
        onOk={() => setIsExportModalOpen(false)}
      >
        <div className="range-picker">
          <h3>Selecione a data inicial e final para exportação:</h3>
          <RangePicker
            locale={locale}
            ranges={{
              Hoje: [moment(), moment()],
              'Última semana': [moment().subtract(1, 'weeks'), moment()],
              'Último mês': [moment().subtract(1, 'month'), moment()],
              'Últimos dois meses': [moment().subtract(1, 'months').startOf('month'), moment()],
              'Últimos três meses': [moment().subtract(2, 'months').startOf('month'), moment()],
            }}
            onChange={(array) => {
              if (array) {
                setDateRange(array);
              }
            }}
          />
          {
            ticketsToExport.length > 0
              ? <h3 style={{ marginTop: 20 }}>{`Total de chamados encontrados: ${ticketsToExport.length}`}</h3>
              : <h3 style={{ marginTop: 20 }}>Nenhum chamado encontrado na data selecionada.</h3>
          }
        </div>
      </Modal>
      <header>
        <div className="headerTitulo">
          <div className="tituloPagina">
            <div className="detalhe"> </div>
            <h1>Últimos Tickets</h1>
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
          {(profile.access_type !== 'consultor') && (
            <button
              className="ingressoButton"
              type="button"
              onClick={() => {
                dispatch(navigate('ingresso'));
              }}
            >
              NOVO TICKET
              <img src={add} alt="novo" />
            </button>
          )}
          <button
            className="ingressoButton"
            type="button"
            style={{ padding: '5px 10px' }}
            title="Exportar chamados"
            onClick={() => setIsExportModalOpen(true)}
          >
            <img src={imprimir_preto} alt="exportar" style={{ margin: 0, height: 30 }} />
          </button>
        </div>

        <div className="headerContent"> </div>
      </header>
      <div className="suportTable">

        <Table
          columns={columns}
          dataSource={atendimentos}
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
