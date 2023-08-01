import { createHistoryDate } from "./createHistoryDate"


describe("ぐるーぷ", ()=>{
    describe("中ぐるーぷ", ()=>{
        test("日付が当たってるか", () => {
            const dummyData = createHistoryDate("2014-04-01T15:00:00.000Z")
            expect(dummyData).toBe("2014年 4月");
        });

        test("日付が当たってるか3", () => {
            const dummyData = createHistoryDate("2014-04-01T15:00:00.000Z")
            expect(dummyData).toBe("2014年 4月");
            //expect(dummyData).toBe("2014年 4月");
        });
    });
    
    test("日付が当たってるか2", () => {
        const dummyData = createHistoryDate("2014-04-01T15:00:00.000Z")
        expect(dummyData).toBe("2014年 4月");
    });
});