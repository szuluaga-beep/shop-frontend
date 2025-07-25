

export const cleanCardNumber = (value: string) => value.replace(/[\s-]/g, '');

export const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Format the digits into groups of 4
    return digits.replace(/(.{4})/g, '$1 ').trim();
}

export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
}

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};