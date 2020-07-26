import moment from "moment";

export function normalizeName(name) {
    return name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, "_");
}

export function formatDate(date) {
    return moment(date).format("YYYY-MM-DD");
}
