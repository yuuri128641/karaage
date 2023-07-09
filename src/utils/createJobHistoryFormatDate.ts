import { FIRST_WORKING_DATE } from "site.config"
import { JobHistory, JobHistoryFormat } from "@/models"

export const createJobHistoryFormatDate = (date:JobHistory[]) => {
    const newBlogList:JobHistoryFormat[] = [];
    const viewedEventList:any = [];
    const todyDate:Date = new Date()
    const todayMonth = todyDate.getFullYear() * 12 + todyDate.getMonth() + 1;
    // 終了日が設定されてなかったら現在進行形の今日の日付を設定
    let endMonth = todayMonth;

    date?.map((item:any) => {
        let duplicationIndex = 0;

        const startDate:Date = new Date(item.startDate);
        const firstJobDate:Date = new Date(FIRST_WORKING_DATE.year, FIRST_WORKING_DATE.month, FIRST_WORKING_DATE.day)
        const startMonth:number = startDate.getFullYear() * 12 + startDate.getMonth() + 1;
        const firstJobMonth:number = firstJobDate.getFullYear() * 12 + firstJobDate.getMonth();

        console.log(item.title);
        if(item.endDate) {
            console.log("true")
        } else {
            console.log("false")
        }

        console.log("todyDate" + todyDate)
        // 終了日が設定されていたら期間を設定
        if (item.endDate) {
            console.log("せってい")
            const endDate:Date = new Date(item.endDate);
            endMonth = endDate.getFullYear() * 12 + endDate.getMonth() + 1;
        }
        
        // 先に開始した業務が存在する場合
        if (viewedEventList.length) {
            viewedEventList.reduceRight((i:void, viewedEventItem:number) => {
                if(startMonth > viewedEventItem) {
                    duplicationIndex++;
                }  
            })
        }

        console.log(endMonth)
        console.log(startMonth)

        const newObj = {
            ...item, 
            duplicationEventLength: duplicationIndex,
            projectDurationLength: endMonth - startMonth,
            jobStartTime: startMonth - firstJobMonth,
        };
        

        console.log(newObj)
        newBlogList.push(newObj)
        viewedEventList.push(startMonth - firstJobMonth + startMonth - firstJobMonth)
    })

    return newBlogList
}
