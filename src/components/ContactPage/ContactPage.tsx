import React, { useEffect, useState } from 'react';
import { FaTelegramPlane, FaVk } from 'react-icons/fa';
import './ContactPage.css';

interface ContactData {
  id: number;
  name: string;
  phone: string;
  address: string;
  workingHours: string;
  description: string;
  socialVk: string;
  socialTelegram: string;
}

const ContactPage: React.FC = () => {
  const [contact, setContact] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/info');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ContactData = await response.json();
        setContact(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Не удалось загрузить контактные данные. Проверьте подключение к серверу.');
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  if (loading) {
    return (
      <div className="contact">
        <div className="contact__loading">Загрузка контактной информации...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contact">
        <div className="contact__error">{error}</div>
      </div>
    );
  }

  if (!contact) return null;

  return (
    <div className="contact">
      <div className="contact__header">
        <h1 className="contact__name">{contact.name}</h1>
        <p className="contact__description">{contact.description}</p>
      </div>

      <div className="contact__grid">
        {/* Карточка с телефоном */}
        <div className="contact__card">
          <div className="contact__card-icon">📞</div>
          <h3 className="contact__card-title">Телефон</h3>
          <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="contact__card-value contact__card-link">
            {contact.phone}
          </a>
          <p className="contact__card-note">Звоните с 11:00 до 23:00</p>
        </div>

        {/* Карточка с адресом */}
        <div className="contact__card">
          <div className="contact__card-icon">📍</div>
          <h3 className="contact__card-title">Адрес</h3>
          <p className="contact__card-value">{contact.address}</p>
        </div>

        {/* Карточка с часами работы */}
        <div className="contact__card">
          <div className="contact__card-icon">🕒</div>
          <h3 className="contact__card-title">Часы работы</h3>
          <p className="contact__card-value">{contact.workingHours}</p>
        </div>
      </div>

      {/* Блок социальных сетей */}
      <div className="contact__social">
        <h2 className="contact__social-title">Мы в соцсетях</h2>
        <div className="contact__social-links">
          {contact.socialTelegram && (
            <a 
              href={contact.socialTelegram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact__social-link"
            >
              <FaTelegramPlane className="contact__social-icon" />
              Telegram
            </a>
          )}
          {contact.socialVk && (
            <a 
              href={contact.socialVk} 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact__social-link"
            >
              <FaVk className="contact__social-icon" />
              VK
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;