export const convertToMonthlyDeathObject = (data) => {
    let map = new Map();
    data.forEach(({reported, status}) => {
        const count = map.get(reported);
        map.set(reported, count?status==="Deceased"?count+1:count:1);
    })
    let res = [];
    map.forEach((count, date, map) => {
        res.push({
            date: date,
            count,
        });
    })
    return res;
} 