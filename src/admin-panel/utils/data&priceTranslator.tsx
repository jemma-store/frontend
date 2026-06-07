export const formatDate = (dateString: string) : string => {
    if (!dateString) return "Дата замовлення не встановленна";
    return dateString.slice(0, 10).replaceAll("-", ".");
}

export const formatPrice = (price: number): string => {
    if (price === undefined || price === null) return "0";
    return price.toLocaleString("uk-UA", {
        maximumFractionDigits: 0,
    });
};