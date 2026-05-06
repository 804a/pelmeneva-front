import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <NavLink 
          to="/menu" 
          className={({ isActive }) => 
            isActive ? 'header__link header__link--active' : 'header__link'
          }
        >
          Меню
        </NavLink>
        <NavLink 
          to="/contacts" 
          className={({ isActive }) => 
            isActive ? 'header__link header__link--active' : 'header__link'
          }
        >
          Контакты
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;