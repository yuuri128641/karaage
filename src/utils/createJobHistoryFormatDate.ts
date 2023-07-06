import { FIRST_WORKING_DATE } from "site.config"
import { JobHistory, JobHistoryFormat } from "@/models"

export const createJobHistoryFormatDate = (date:JobHistory[]) => {
    const newBlogList:JobHistoryFormat[] = [];
    const viewedEventList:any = [];
    const tadyDate:Date = new Date()
    const todayMonth = tadyDate.getFullYear() * 12 + tadyDate.getMonth() + 1;
    let endMonth = todayMonth;

    date?.map((item:any) => {
        let duplicationIndex = 0;

        console.log(item.title)

        const startDate:Date = new Date(item.startDate);
        const endDate:Date = new Date(item.endDate);
        const firstJobDate:Date = new Date(FIRST_WORKING_DATE.year, FIRST_WORKING_DATE.month, FIRST_WORKING_DATE.day)

        const startMonth:number = startDate.getFullYear() * 12 + startDate.getMonth() + 1;

        const itemEndMonth:number = endDate.getFullYear() * 12 + endDate.getMonth() + 1;
        const firstJobMonth:number = firstJobDate.getFullYear() * 12 + firstJobDate.getMonth();

        if (!(endDate.getFullYear() === tadyDate.getFullYear()) 
        || (endDate.getMonth() < tadyDate.getMonth())) {
        console.log(tadyDate.getFullYear())
        console.log(endDate.getFullYear())
        endMonth = itemEndMonth;
        }
        
        if (viewedEventList.length) {
        viewedEventList.reduceRight((i:void, viewedEventItem:number) => {
            if(startMonth > viewedEventItem) {
            duplicationIndex++;""
            }  
        })
        }

        const newObj = {...item, 
        duplicationEventLength: duplicationIndex,
        projectDurationLength: endMonth - startMonth,
        jobStartTime: startMonth - firstJobMonth,
        };
        
        newBlogList.push(newObj)
        viewedEventList.push(startMonth - firstJobMonth + startMonth - firstJobMonth)
    })

    return newBlogList
}
