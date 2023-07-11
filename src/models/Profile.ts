export type CompanyHistory = {
    date: string
    openCompany: string
    certifiedCompany: string
    outline: string
}

export type ProfileSkill = {
    title: string
    content: string
    year: number
}

export type Profile = {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    companyHistory: CompanyHistory[]
    companyHistoryNote: string
    technique: string
    pr: string
    devSkill: ProfileSkill[]
    otherDevSkill: ProfileSkill[]
    designSkill: ProfileSkill[]
    videoSkill: ProfileSkill[] 
    otherSkill: ProfileSkill[]
    openName: string
    closeName: string
    profileText: string
    hobby: string
}
