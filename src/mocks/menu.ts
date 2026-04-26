import { http, HttpResponse } from 'msw';
import menuPic from '../shared/Menu/menuItem.jpg'

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Борщ',
    price: 350,
    image: menuPic,
    description: 'Классический украинский борщ со свеклой, капустой, картофелем и сметаной. Подается с чесночными пампушками и салом.'
  },
  {
    id: 2,
    name: 'Цезарь с курицей',
    price: 420,
    image: menuPic,
    description: 'Сочная куриная грудка на гриле с хрустящими листьями салата романо, пармезаном, гренками и фирменной заправкой Цезарь.'
  },
  {
    id: 3,
    name: 'Паста Карбонара',
    price: 480,
    image: menuPic,
    description: 'Итальянская паста с беконом, яичным желтком, сливками и пармезаном. Приготовлена по традиционному рецепту с добавлением черного перца.'
  },
  {
    id: 4,
    name: 'Стейк Рибай',
    price: 1200,
    image: menuPic,
    description: 'Премиальный стейк из мраморной говядины, обжаренный до идеальной прожарки Medium Rare. Подается с овощами гриль и соусом демиглас.'
  },
  {
    id: 5,
    name: 'Ролл Филадельфия',
    price: 550,
    image: menuPic,
    description: 'Классический ролл с лососем, сливочным сыром Филадельфия, авокадо и рисом. Подается с соевым соусом, васаби и маринованным имбирем.'
  },
  {
    id: 6,
    name: 'Тирамису',
    price: 380,
    image: menuPic,
    description: 'Нежный итальянский десерт из печенья савоярди, пропитанного кофе, с маскарпоне и какао. Идеальное завершение ужина.'
  },
  {
    id: 7,
    name: 'Пицца Маргарита',
    price: 520,
    image: menuPic,
    description: 'Тонкое итальянское тесто с томатным соусом, моцареллой, свежими помидорами и базиликом. Запекается в дровяной печи при 450°C.'
  },
  {
    id: 8,
    name: 'Греческий салат',
    price: 320,
    image: menuPic,
    description: 'Свежий салат из помидоров, огурцов, болгарского перца, красного лука, маслин и сыра фета. Заправлен оливковым маслом и орегано.'
  },
  {
    id: 9,
    name: 'Куриные крылышки',
    price: 450,
    image: menuPic,
    description: 'Хрустящие куриные крылышки в панировке с острым соусом Баффало. Подаются с соусом блю-чиз и сельдереевыми палочками.'
  }
];

export const menuHandlers = [
  http.get('http://localhost:8081/api/menu', () => {
    console.log('[MSW] Перехвачен запрос к /api/menu');
    return HttpResponse.json(menuItems);
  }),
  
  http.get('http://localhost:8081/api/menu/:id', ({ params }) => {
    const { id } = params;
    console.log(`[MSW] Перехвачен запрос к /api/menu/${id}`);
    
    const itemId = Number(id);
    const menuItem = menuItems.find(item => item.id === itemId);
    
    if (!menuItem) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Блюдо не найдено'
      });
    }
    
    return HttpResponse.json(menuItem);
  })
];