// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

interface ContactInfo {
  id: number;
  name: string;
  phone: string;
  address: string;
  workingHours: string;
  description: string;
  socialVk: string;
  socialTelegram: string;
}

const mockContactInfo: ContactInfo = {
  id: 1,
  name: "Пельмень Евы",
  phone: "8-800-200-80-42",
  address: "г. Омск, ул. Ленина, д. 42",
  workingHours: "ежедневно с 11:00 до 23:00",
  description: "Домашние пельмени с доставкой за 40 минут",
  socialVk: "https://vk.com/pelmeni_eva",
  socialTelegram: "https://t.me/pelmeni_eva"
};

export const ContactHandlers = [
  http.get('http://localhost:8081/api/info', () => {
    return HttpResponse.json(mockContactInfo);
  }),
];