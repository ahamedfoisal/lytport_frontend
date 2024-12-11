import db from './db';

async function getTrendyCaptionsOfTheWeek() {
    try {
        const currentDate = new Date();
        const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const currentMonth = Months[currentDate.getMonth()];
        const currentDay = currentDate.getDate();
        
        const response = await db.query(` WITH target_row AS (
            SELECT * FROM top_captions_per_day 
                WHERE month_day = '${currentMonth}-${currentDay}'
            )
            SELECT *  FROM (
                SELECT *, 
                    ABS(EXTRACT(DOY FROM TO_DATE(month_day, 'MM-DD')) - 
                        EXTRACT(DOY FROM TO_DATE('${currentMonth}-${currentDay}', 'MM-DD'))) AS day_difference
                FROM top_captions_per_day
            ) subquery
            WHERE month_day != '${currentMonth}-${currentDay}'
            LIMIT 6;
    `);
        
        return response;
    } catch (error) {
        console.error('Error fetching trendy captions:', error);
        throw error;
    }
}

export { getTrendyCaptionsOfTheWeek }