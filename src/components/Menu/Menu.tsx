import { useState, useEffect } from 'react';
import './Menu.css';

interface MenuItem {
    id: number;
    name: string;
    price: number;
    image?: string;
}

interface MenuItemDetail {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

export const Menu = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<MenuItemDetail | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/menu');
                
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке меню');
                }
                
                const data = await response.json();
                setMenuItems(data);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    const handleCardClick = async (id: number) => {
        setModalLoading(true);
        setIsModalOpen(true);
        
        try {
            const response = await fetch(`http://localhost:8081/api/menu/${id}`);
            
            if (!response.ok) {
                throw new Error('Ошибка при загрузке информации о блюде');
            }
            
            const data = await response.json();
            setSelectedItem(data);
        } catch (err) {
            console.error('Ошибка:', err);
            setSelectedItem(null);
        } finally {
            setModalLoading(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    if (loading) {
        return (
            <div className='menu'>
                <div className='menu__loading'>Загрузка меню...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='menu'>
                <div className='menu__error'>Ошибка: {error}</div>
            </div>
        );
    }

    return (
        <div className='menu'>
            <div className='menu__items'>
                {menuItems.map((item) => (
                    <div 
                        key={item.id} 
                        className='menu__card'
                        onClick={() => handleCardClick(item.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleCardClick(item.id);
                            }
                        }}
                    >
                        {item.image && (
                            <div className='menu__card-image'>
                                <img src={item.image} alt={item.name} />
                            </div>
                        )}
                        <div className='menu__card-content'>
                            <h3 className='menu__card-title'>{item.name}</h3>
                            <p className='menu__card-price'>{item.price} ₽</p>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className='modal-overlay' onClick={handleCloseModal}>
                    <div 
                        className='modal-content' 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            className='modal-close'
                            onClick={handleCloseModal}
                        >
                            ×
                        </button>
                        
                        {modalLoading ? (
                            <div className='modal-loading'>Загрузка...</div>
                        ) : selectedItem ? (
                            <div className='modal-detail'>
                                <div className='modal-detail__image'>
                                    <img 
                                        src={selectedItem.image} 
                                        alt={selectedItem.name} 
                                    />
                                </div>
                                <div className='modal-detail__info'>
                                    <h1 className='modal-detail__name'>
                                        {selectedItem.name}
                                    </h1>
                                    <p className='modal-detail__price'>
                                        {selectedItem.price} ₽
                                    </p>
                                    <p className='modal-detail__description'>
                                        {selectedItem.description}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className='modal-error'>
                                Не удалось загрузить информацию о блюде
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};