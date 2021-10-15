

interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number;
    getDate(): Date;
    compareInDays(start_date: Date, end_date: Date): number;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };