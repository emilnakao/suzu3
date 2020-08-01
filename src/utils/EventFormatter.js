class EventFormatter {
    formatEventDate(event) {
        if (!event) {
            return "--/--/----";
        }

        if (event.date) {
            return event.date;
        } else {
            return "Dia não definido.";
        }
    }
}

export default new EventFormatter();
