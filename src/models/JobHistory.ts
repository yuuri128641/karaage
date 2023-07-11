export type BusinessContent = {
    title: string
    contents: string
}

export type JobHistory = {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    title: string
    endDate: string
    startDate: string
    historyCategory: string
    jobCategory: string
    inChangeOf: string
    role: string
    technology: string
    structure: string
    businessContent: string
    achievement: BusinessContent[]
    result: string
    tag: string
}

export type JobHistoryFormat = {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    title: string
    endDate?: string
    startDate: string
    duplicationEventLength: number
    projectDurationLength: number
    jobStartTime: number
    historyCategory: string
    jobCategory: string
    inChangeOf: string
    role: string
    technology: string
    structure: string
    businessContent: string
    achievement: BusinessContent[]
    result: string
    tag: string
}
