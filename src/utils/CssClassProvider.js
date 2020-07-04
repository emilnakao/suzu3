export function getPersonCssClassFromPresence(presence) {
    if (!presence) {
        return undefined;
    }

    if (presence.isFirstTime) {
        return "first-time-color";
    }

    if (presence.person && presence.person.isMiKumite) {
        return "mikumite-color";
    }

    if (presence.person && presence.person.isMtai) {
        return "mtai-color";
    }

    return "kumite-color";
};