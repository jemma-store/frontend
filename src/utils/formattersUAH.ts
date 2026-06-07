export const formatCurrency = (value: number | string) => {
    const numericValue = Number(value);
    const formattedNumber = new Intl.NumberFormat('en-US', {
        maximumFractionDigits : 0,
    }).format(numericValue);

    return `₴ ${formattedNumber}`;
};