import {
    toast
} from 'react-toastify';

/**
 *
 * @author emil
 * @since 1.0
 */
class NotificationService {

    error(title, message) {
        toast.error(title, message)
    }

    success(title, message) {
        toast.success(title, message)
    }
}

export default new NotificationService()