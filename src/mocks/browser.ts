import { setupWorker } from 'msw/browser';
import { menuHandlers } from './menu';

export const worker = setupWorker(...menuHandlers);