const { formatDate } = require("../StringUtils");

it("formatDate: format date object", () => {
    // JS month is 0-based
    expect(formatDate(new Date(2020, 1, 1))).toEqual("2020-02-01");
});

it("formatDate: undefined date returns undefined", () => {
    expect(formatDate(undefined)).toEqual(undefined);
});

it("formatDate receives String", () => {
    expect(formatDate("2020-02-01")).toEqual("2020-02-01");
    expect(formatDate("2020-02-01 10:00")).toEqual("2020-02-01");
    expect(formatDate("2020-02-01 10:00:00.0000")).toEqual("2020-02-01");
});
