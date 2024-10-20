export const ServerUrl = import.meta.env.VITE_SERVER_URL;
export function formatCurrency(number) {
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}