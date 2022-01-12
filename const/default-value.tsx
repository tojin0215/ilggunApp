interface GetMinimumPayPerHour {
    (year: number | undefined): number
}

export const getMinimumPayPerHour: GetMinimumPayPerHour = function(year: number = 0) {
    switch(year) {
        case 2019: return 8350;
        case 2020: return 8590;
        case 2021: return 8720;
        case 2022: return 9160;
        default: 9160;
    }
}