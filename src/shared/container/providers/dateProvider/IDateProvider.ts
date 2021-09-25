

interface IDateProvider{
    compareInHours(start_date: Date, end_date: Date): number;
    getDate(): Date;
}

export { IDateProvider };