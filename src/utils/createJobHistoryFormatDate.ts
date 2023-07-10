import { FIRST_WORKING_DATE } from "site.config"
import { JobHistory, JobHistoryFormat } from "@/models"

export const createJobHistoryFormatDate = (date:JobHistory[]) => {
    const newBlogList:JobHistoryFormat[] = [];
    const viewedEventList:any = [""];
    const todyDate:Date = new Date()
    const todayMonth = todyDate.getFullYear() * 12 + todyDate.getMonth() + 1;

    date?.map((item:any) => {
        let duplicationIndex = 0;
        const duplicationList:any = [0,0,0,0,0,0,0,0,0,0,];
        
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

        /*
        console.log("startMonth" + startMonth)
        console.log("endDate" + endDate)*/
        
        // 先に開始した業務が存在する場合
        if (viewedEventList.length) {
            /*
            viewedEventList.reduceRight((i:void, viewedEventItem:number[]) => {
                console.log("endDate" + viewedEventItem[1])
                if(startMonth < viewedEventItem[1] || startMonth === viewedEventItem[0] ) {
                    duplicationIndex++;
                }  
            })
            */

            console.log(item.title)

            viewedEventList.forEach((elem, index) => {
                if(startMonth <= elem[1]) {
                    
                    duplicationIndex++;

                    duplicationList[elem[2]] =  1;


                    if(index <= elem[2]) {
                        console.log("currentDuplicationIndex " + duplicationIndex)
                        console.log("startMonth " + startMonth)
                        console.log("elmstartMonth " + elem[0])
                        console.log("elmendDate " + elem[1])
                        console.log("duplicationIndex " + elem[2])
                        console.log("")
                        //duplicationIndex = duplicationIndex - 1;
                    }
                }
                
                /*if(startMonth < elem[1] && duplicationIndex < elem[2]) {
                    duplicationIndex--;
                }*/
            })
        }

        console.log(duplicationList)
        console.log("なんばんめ" + duplicationList.indexOf(0))

        duplicationIndex = duplicationList.indexOf(0)

        //duplicationList

        const newObj = {
            ...item, 
            duplicationEventLength: duplicationIndex,
            projectDurationLength: endMonth - startMonth,
            jobStartTime: jobStartTime,
        };

        newBlogList.push(newObj)
        //viewedEventList.push(startMonth - firstJobMonth + startMonth - firstJobMonth)
        viewedEventList.unshift([startMonth, endMonth, duplicationIndex] )
    })

    return newBlogList
}
