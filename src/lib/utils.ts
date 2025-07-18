

export const cleanCardNumber = (value: string) => value.replace(/[\s-]/g, '');

export const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Format the digits into groups of 4
    return digits.replace(/(.{4})/g, '$1 ').trim();
}
