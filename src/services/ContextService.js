/**
 * Responsible for providing browser session information, such as:
 *
 * - current location (Dojo/Regional)
 * - current user
 *
 * @author emil
 * @since 1.0
 * 
 * @deprecated state managed in App.js
 */
class ContextService {

    // TODO: initialization, and save data in local storage

    getCurrentContext(){
        // if for any reason we don't have a regional defined, we should return a null object (not just null or undefined).

        return {
            regional: {
                id: -1,
                name: 'Pinheiros'
            },
            user: {
                login: 'admin',
                authorizations: [

                ]
            },
            event: {
                id: 2,
                event_type: {
                    id: 2,
                    name: 'Dia Normal'
                },
                begin_date_time: '2020-03-20 00:00:00'
            }
        }
    }
}

export default new ContextService()