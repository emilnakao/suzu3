class EventFormatter {

    formatEventDate(event){
        if(event.begin_date_time){
            let date = new Date(event.begin_date_time);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        }else{
            return 'Dia não definido.'
        }
    }
}

export default new EventFormatter();