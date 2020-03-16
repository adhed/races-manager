export const getCurrentDate = (): string => {
    const date = new Date();
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const fullMonth = getNumberWithZeroDigit(month);
    const fullDay = getNumberWithZeroDigit(day);

    return `${year}-${fullMonth}-${fullDay}`;
};

export const getNumberWithZeroDigit = (value: number): string => {
    return value.toString().length === 1 ? `0${value}` : value.toString();
};
