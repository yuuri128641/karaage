

export const convertToTimeZoneJapan = (date:Date) => {

    const dateUTC = new Date(date)
    const japaneseTime = new Date(dateUTC + (10000 * 60 * 60))

    return japaneseTime;
}
