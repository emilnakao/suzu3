import moment from "moment";

export function getMinutesFromMidnightFromDate(timeDate){
    if(!timeDate){
        return undefined;
    }

    return timeDate.getHours() * 60 + timeDate.getMinutes()
}

export function getMinutesFromMidnightFromString(timeString){
    if(!timeString){
        return undefined;
    }

    return getMinutesFromMidnightFromDate(moment(timeString, "HH:mm").toDate());
}

