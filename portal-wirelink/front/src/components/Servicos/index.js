import React, { useEffect, useState } from 'react';
import { Table, Modal } from 'antd';
import { useSelector } from 'react-redux';

import eye from '../../assets/icons/olho.png';
import info from '../../assets/icons/info.png';
import ativo from '../../assets/icons/ativo.png';
import pesquisar from '../../assets/icons/pesquisar.png';
import './styles.scss';
import api from '../../services/api';

function Suporte() {
  const [sortedInfo, setSortedInfo] = useState({});
  const [servicos, setServicos] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState({ rest: {} });
  const selectedCompany = useSelector((state) => state.user.company);

  async function getSuportes() {
    try {
      const response = await api.get(`/middleware/get_services?id=${selectedCompany}`);

      if (!response.data.result) {
        const dataFormatted = response.data.map((servico) => ({

          key: servico.pedido,
          pedido: servico.pedido,
          service: servico.servico,
          status: servico.status,
          rest: { ...servico },
        }));
        setServicos(dataFormatted);
      } else {
        console.warn({ title: 'Opss!', content: 'Serviços Não Encontrados' });
      }
    } catch (error) {
      console.error({ title: 'Ops!!', content: 'Erro ao buscar serviços' });
      setServicos([]);
    }
  }

  useEffect(() => {
    getSuportes();
  }, [selectedCompany]);

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: (<span className="column-title">Pedido</span>),
      dataIndex: 'pedido',
      key: 'pedido',
      width: 150,
      sorter: (a, b) => a.pedido - b.pedido,
      sortOrder: sortedInfo.columnKey === 'pedido' && sortedInfo.order,
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
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: (<span className="column-title">#</span>),
      dataIndex: '',
      key: 'eye',
      width: 120,
      render: (text, record) => (
        <button
          type="button"
          className="tableCell"
          onClick={() => {
            setIsModalVisible(true);
            setSelectedRow(record);
          }}
        >
          <img src={eye} alt="eye" />
        </button>
      ),
    },
    {
      title: (<span className="column-title">Estado</span>),
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (text) => {
        switch (text) {
          case 'ENCERRADO':
            return (
              <div className="stateCell encerrado">
                <img src={info} alt="info" />
                <span>{text}</span>
              </div>
            );

          default:
            return (
              <div className="stateCell">
                <img src={ativo} alt="ativo" />
                <span>{text}</span>
              </div>
            );
        }
      },
    },

  ];

  const searchTable = (s) => {
    const filteredData = [];
    if (s.length === 0) {
      return getSuportes();
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < servicos.length; ++i) {
      const newValue = s.toUpperCase();

      const user = servicos[i];

      if (user.service.toUpperCase().includes(newValue)
      || user.pedido.toUpperCase().includes(newValue)) {
        filteredData.push(servicos[i]);
      }
    }
    return setServicos(filteredData);
  };

  const updateSearch = (query) => {
    searchTable(query);
  };
  return (
    <div className="servicosContainer">

      <Modal
        title={(
          <div className="modalHeader">
            <img src={info} alt="info" />
            <span>Informações de Serviços</span>
            <button type="button" onClick={() => setIsModalVisible(false)}>
              x
            </button>
          </div>
        )}
        visible={isModalVisible}
        centered
        width={300}
        footer={null}
        closable={false}
        style={{ padding: 0 }}
        bodyStyle={{ padding: 0 }}
      >
        <div className="modalContainer">
          <div className="modalContent">

            {selectedRow.rest.porta_a && (
              <span>
                Porta_a:
                {' '}
                <span>{selectedRow.rest.porta_a}</span>
              </span>
            )}
            {selectedRow.rest.porta_b && (
              <span>
                Porta_b:
                {' '}
                <span>{selectedRow.rest.porta_b}</span>
              </span>
            )}

            {selectedRow.rest.roteador_a && (
              <span>
                Roteador_a:
                {' '}
                <span>{selectedRow.rest.roteador_a}</span>
              </span>
            )}
            {selectedRow.rest.roteador_b && (
              <span>
                Roteador_b:
                {' '}
                <span>{selectedRow.rest.roteador_b}</span>
              </span>
            )}
            {selectedRow.rest.vlan && (
              <span>
                Vlan:
                {' '}
                <span>{selectedRow.rest.vlan}</span>
              </span>
            )}
            {selectedRow.rest.designacao && (
              <span>
                Designação:
                {' '}
                <span>{selectedRow.rest.designacao}</span>
              </span>
            )}
            {selectedRow.rest.estacao_a && (
              <span>
                Estação_a:
                {' '}
                <span>{selectedRow.rest.estacao_a}</span>
              </span>
            )}
            {selectedRow.rest.estacao_b && (
              <span>
                Estação_b:
                {' '}
                <span>{selectedRow.rest.estacao_b}</span>
              </span>
            )}
            {
              !selectedRow.rest.porta_a
              && !selectedRow.rest.porta_b
              && !selectedRow.rest.roteador_a
              && !selectedRow.rest.roteador_b
              && !selectedRow.rest.vlan
              && !selectedRow.rest.designacao
              && !selectedRow.rest.estacao_a
              && !selectedRow.rest.estacao_b
              && (<span>A designação não está cadastrada.</span>)
            }
            <div />
          </div>
        </div>
      </Modal>

      <header>
        <div className="headerTitulo">
          <div className="tituloPagina">
            <div className="detalhe"> </div>
            <h1>Serviços</h1>
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
      <div className="table">

        <Table
          columns={columns}
          dataSource={servicos}
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
