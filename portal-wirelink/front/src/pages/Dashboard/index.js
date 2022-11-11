import { Dropdown, Menu } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import faturac from '../../assets/icons/menus/faturac.png';
import homec from '../../assets/icons/menus/homec.png';
import servicosc from '../../assets/icons/menus/servicosc.png';
import suportec from '../../assets/icons/menus/suportec.png';
import setab from '../../assets/icons/setab.png';
import logo from '../../assets/logo/logoBranco.svg';
import DashboardHome from '../../components/DashboardHome';
import Fatura from '../../components/Fatura';
import Historico from '../../components/Historico';
import NovoIngresso from '../../components/NovoIngresso';
import Servicos from '../../components/Servicos';
import Suporte from '../../components/Suporte';
import { signOut } from '../../store/modules/auth/actions';
import { navigate } from '../../store/modules/navigation/actions';
import { updateCompany } from '../../store/modules/user/actions';
import './styles.scss';

function Dashboard() {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.user.profile);
  const selectedPage = useSelector((state) => state.navigation.route);
  const selectedCompany = useSelector((state) => state.user.company);
  const userType = profile?.access_type.toLowerCase();

  const menu = (
    <Menu
      defaultSelectedKeys={[]}
      onClick={({
        item, key,
      }) => {
        if (key === 'sair') {
          dispatch(signOut());
        } else {
          dispatch(updateCompany(item.props.children[1].props.props.eventKey));
        }
      }}
      className="custom-scrollbar"
    >
      {
        profile?.companys?.map((company) => (
          <Menu.Item key={company.id_wirelink} className={company.id_wirelink === selectedCompany ? 'selectedItem' : ''}>
            <div className="check" />
            {company.reason}
          </Menu.Item>
        ))
      }
      <Menu.Divider />
      <Menu.Item key="sair" danger>Sair</Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const validSelectedCompany = profile?.companys?.filter(
      (company) => company.id_wirelink === selectedCompany,
    );

    if (validSelectedCompany?.length === 0) {
      dispatch(updateCompany(profile?.companys[0].id_wirelink));
    }
  }, []);

  return (
    <div className="dashContainer">
      <header className="header">
        <img src={logo} alt="logo" className="logo" />
        <div className="menu">
          <Dropdown overlay={menu}>
            <button
              type="button"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Olá,
              {' '}
              {profile?.name}
              <img src={setab} alt="setab" />
            </button>
          </Dropdown>
          <span>
            {profile?.companys?.filter(
              (company) => company.id_wirelink === selectedCompany,
            )[0]?.reason}
          </span>
        </div>
      </header>
      <main className="dashContent">
        <div className="dashButtonsContainer">
          {userType === 'administrador' && (
            <button
              type="button"
              className={`button ${selectedPage === 'home' ? 'selectedPage' : ''}`}
              onClick={() => dispatch(navigate('home'))}
            >
              <img src={homec} alt="home" />
              <span>Home</span>
            </button>
          )}
          {(userType !== 'financeiro') && (
            <button
              type="button"
              className={`button ${selectedPage === 'suporte' || selectedPage === 'ingresso' || selectedPage === 'historico' ? 'selectedPage' : ''}`}
              onClick={() => dispatch(navigate('suporte'))}
            >
              <img src={suportec} alt="Atendimento" />
              <span>Atendimento</span>
            </button>
          )}
          {(userType !== 'consultor') && (
            <button
              type="button"
              className={`button ${selectedPage === 'servicos' ? 'selectedPage' : ''}`}
              onClick={() => dispatch(navigate('servicos'))}
            >
              <img src={servicosc} alt="servicos" />
              <span>Serviços</span>
            </button>
          )}
          {(userType === 'administrador'
            || userType === 'financeiro'
          ) && (
            <button
              type="button"
              className={`button ${selectedPage === 'fatura' ? 'selectedPage' : ''}`}
              onClick={() => dispatch(navigate('fatura'))}
            >
              <img src={faturac} alt="fatura" />
              <span>Faturas</span>
            </button>
          )}
        </div>
        {selectedPage === 'home' ? (<DashboardHome />)
          : selectedPage === 'suporte' ? (<Suporte />)
            : selectedPage === 'servicos' ? (<Servicos />)
              : selectedPage === 'fatura' ? (<Fatura />)
                : selectedPage === 'ingresso' ? (<NovoIngresso />)
                  : (<Historico />)}
      </main>
      <footer className="footer">
        <span>Wirelink. © 2020. Todos os direitos reservados.</span>
      </footer>
    </div>
  );
}

export default Dashboard;
