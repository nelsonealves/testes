import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label,
} from 'recharts';
import './styles.scss';
import { useSelector } from 'react-redux';
import api from '../../services/api';

function DashboardHome() {
  const selectedCompany = useSelector((state) => state.user.company);

  const [lastTickets, setLastTickets] = useState(0);
  const [debito, setDebito] = useState(0);
  const [ticketsG, setTicketsG] = useState([]);

  useEffect(() => {
    async function getHomeData() {
      try {
        const response = await api.get(`/middleware/graphic_data/?id=${selectedCompany}`);

        setLastTickets(response.data.last_tickets);
        setDebito(response.data.debito);
        setTicketsG(response.data.tickets_graph);
      } catch (error) {
        setLastTickets(0);
        setDebito(0);
        setTicketsG([
          {
            name: 'JAN',
            tickets: 0,
          },
          {
            name: 'FEV',
            tickets: 0,
          },
          {
            name: 'MAR',
            tickets: 0,
          },
          {
            name: 'ABR',
            tickets: 0,
          },
          {
            name: 'MAI',
            tickets: 0,
          },
          {
            name: 'JUN',
            tickets: 0,
          },
          {
            name: 'JUL',
            tickets: 0,
          },
          {
            name: 'AGO',
            tickets: 0,
          },
          {
            name: 'SET',
            tickets: 0,
          },
          {
            name: 'OUT',
            tickets: 0,
          },
          {
            name: 'NOV',
            tickets: 0,
          },
          {
            name: 'DEZ',
            tickets: 0,
          },
        ]);
      }
    }
    getHomeData();
  }, [selectedCompany]);

  return (
    <div className="dashHomeContainer">
      <section>
        <div className="tickets">
          <span className="branco">ÚLTIMOS TICKETS CRIADOS</span>
          <span className="amarelo">{lastTickets}</span>
        </div>
        <div className="tickets">
          <span className="branco">QUANTIDADE EM DÉBITO</span>
          <span className="amarelo">
            R$
            {' '}
            {debito}
          </span>
        </div>
      </section>
      <section>
        <div className="graficos">
          <span className="title">Visão Geral - Tickets</span>
          <div className="indicador">
            <div> </div>
            <span>Tickets Criados</span>
          </div>
          <LineChart
            width={500}
            height={200}
            data={ticketsG}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="0" stroke="#fff" />
            <XAxis dataKey="name" stroke="#fff" fontSize="10px">
              <Label
                value="Tickets por Mês"
                offset={-2}
                position="insideBottom"
                fill="#fff"
                fontSize="12px"
              />
            </XAxis>
            <YAxis
              stroke="#fff"
              fontSize="10px"
              allowDecimals={false}
              label={
                {
                  value: 'Quantidade',
                  angle: '-90',
                  position: 'center',
                  viewBox: {
                    x: -20,
                    y: 60,
                    width: 100,
                    height: 50,
                  },
                  fill: '#fff',
                  fontSize: '12px',
                }
              }
            />
            <Tooltip
              itemStyle={{ color: '#000' }}
            />
            <Line type="monotone" dataKey="tickets" stroke="#fff" dot={{ fill: '#FBE91B' }} />
          </LineChart>
        </div>
      </section>
    </div>
  );
}

export default DashboardHome;
