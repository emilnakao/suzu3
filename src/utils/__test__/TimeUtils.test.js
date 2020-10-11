const { getMinutesFromMidnightFromString, getMinutesFromMidnightFromDate } = require("../TimeUtils")

it("converts 00:00", () => {
    let result = getMinutesFromMidnightFromString("00:00");
    expect(result).toEqual(0);
})

it("converts 00:01", () => {
    let result = getMinutesFromMidnightFromString("00:01");
    expect(result).toEqual(1);
})