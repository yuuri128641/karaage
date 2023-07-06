
export type JobHistory = {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    title: string
    endDate: string
    startDate: string
}

export type JobHistoryFormat = {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    title: string
    endDate: string
    startDate: string
    duplicationEventLength: number
    projectDurationLength: number
    jobStartTime: number
}