import { FIRST_WORKING_DATE } from "site.config"
import { JobHistory, JobHistoryFormat } from "@/models"

export const createJobHistoryFormatDate = (date:JobHistory[]) => {
    const newBlogList:JobHistoryFormat[] = [];
    const viewedEventList:any = [""];
    const todyDate:Date = new Date()
    const todayMonth = todyDate.getFullYear() * 12 + todyDate.getMonth() + 1;

    date?.map((item:any) => {
        let duplicationIndex = 0;
        const duplicationList:number[] = new Array<number>(date.length).fill(0)
        console.log(duplicationList)
        
        // 終了日が未設定・未来日の場合は現在の日付を設定
        let endMonth = todayMonth;

        const startDate:Date = new Date(item.startDate);
        const endDate:Date = new Date(item.endDate);
        const firstJobDate:Date = new Date(FIRST_WORKING_DATE.year, FIRST_WORKING_DATE.month, FIRST_WORKING_DATE.day)
        const startMonth:number = startDate.getFullYear() * 12 + startDate.getMonth() + 1;
        const firstJobMonth:number = firstJobDate.getFullYear() * 12 + firstJobDate.getMonth();
        const jobStartTime:number = startMonth - firstJobMonth

        // 終了日が設定されていて、未来にでなかったら期間を設定
        if (item.endDate && (todyDate > endDate)) {
            endMonth = endDate.getFullYear() * 12 + endDate.getMonth() + 1;
        }

        // 先に開始した業務が存在する場合
        if (viewedEventList.length) {
            viewedEventList.forEach((elem:number[]) => {
                if(startMonth <= elem[0]) {
                    duplicationIndex++;
                    duplicationList[elem[1]] =  1;
                }
            })
        }

        duplicationIndex = duplicationList.indexOf(0)

        const newObj = {
            ...item, 
            duplicationEventLength: duplicationIndex,
            projectDurationLength: endMonth - startMonth,
            jobStartTime: jobStartTime,
        };

        newBlogList.push(newObj)
        viewedEventList.unshift([endMonth, duplicationIndex] )
    })

    return newBlogList
}
