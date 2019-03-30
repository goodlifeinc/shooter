abstract class Util {
    public static diffDatesInSeconds(date1: Date, date2: Date): Number {
        const dif = date2.getTime() - date1.getTime();
    
        const Seconds_from_T1_to_T2 = dif / 1000;
        return Math.abs(Seconds_from_T1_to_T2);
    }
}

export default Util;
