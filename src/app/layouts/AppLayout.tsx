import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import MenuPage from '../../pages/MenuPage';
import Contacts from '../../pages/Contacts'; 

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <main className="app__content">
        <Routes>
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/contacts" element={<Contacts />} /> 
          <Route path="/" element={<Navigate to="/menu" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default AppLayout;