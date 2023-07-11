export const createHistoryDate = (date:string | undefined) => {

    const formatDate = date ? new Date(date) : new Date()

    const year:number = formatDate.getFullYear();
    const month:number = formatDate.getMonth();

    const stringDate = `${year}年 ${month}月`

    return stringDate;
}