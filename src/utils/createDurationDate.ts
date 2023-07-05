export const createDurationDate = (startDate:Date, tadyDate:Date) => {

    const dateList = [
        {
            year: startDate.getFullYear(),
            month: startDate.getMonth(),
        }
    ]

    for(const d = startDate; d <= tadyDate; d.setMonth(d.getMonth()+1)) {
        
            const formatedYear = d.getFullYear();
            const formatedMonth = d.getMonth()+1;
            
            dateList.push({
                year: formatedYear,
                month: formatedMonth,
            });
    }

    return dateList;
}