export const getCurrentDate = (): string => {
    return getDate(new Date())
};

export const getDate = (value: Date): string => {
    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const fullMonth = getNumberWithZeroDigit(month);
    const fullDay = getNumberWithZeroDigit(day);

    return `${year}-${fullMonth}-${fullDay}`;
};

export const getNumberWithZeroDigit = (value: number): string => {
    return value.toString().length === 1 ? `0${value}` : value.toString();
};

export const getParsedDate = (isoDate: Date): string => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const fullMonth = getNumberWithZeroDigit(month);
    const fullDay = getNumberWithZeroDigit(day);

    return `${fullDay}-${fullMonth}-${year}`;
};


export const sortByDate = (date1: Date, date2: Date): number => {
    const parsedDate1 = new Date(date1);
    const parsedDate2 = new Date(date2);
    return parsedDate1 > parsedDate2 ? -1 : parsedDate1 < parsedDate2 ? 1 : 0;
};
