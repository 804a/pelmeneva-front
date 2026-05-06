import { setupWorker } from 'msw/browser';
import { menuHandlers } from './menu';
import { ContactHandlers } from './contacts'; // Импортируем ContactHandlers

export const worker = setupWorker(...menuHandlers, ...ContactHandlers);