import { toast } from 'sonner';

export { toast, Toaster } from 'sonner';

export const notify = (msg: string) => toast.error(msg);
