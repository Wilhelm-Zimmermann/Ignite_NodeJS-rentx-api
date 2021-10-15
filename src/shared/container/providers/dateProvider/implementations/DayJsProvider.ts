import { IDateProvider } from "../IDateProvider";
import dayjs from  "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

class DayJsProvider implements IDateProvider{
    
    compareInHours(start_date: Date, end_date: Date): number {
        const endDateUTC = this.convertToUtc(end_date);
        const startDateUTC = this.convertToUtc(start_date);
        return dayjs(endDateUTC).diff(startDateUTC, "hours");
    }
    
    private convertToUtc(date: Date): string{
        return dayjs(date).utc().local().format();
    }
    
    getDate():Date{
        return dayjs().toDate()
    }
    compareInDays(start_date: Date, end_date: Date): number {
        const endDateUTC = this.convertToUtc(end_date);
        const startDateUTC = this.convertToUtc(start_date);
        return dayjs(endDateUTC).diff(startDateUTC, "days");
    }

    addDays(days: number): Date{
        return dayjs().add(days, "days").toDate();
    }

    addHours(hours: number): Date{
        return dayjs().add(hours, "hours").toDate();
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }
}

export { DayJsProvider };