import { 
    EMPLOYEE_UPDATE, 
    EMPLOYEE_CREATE,
    CREATING_EMPLOYEE,
    UPDATING_EMPLOYEE,
    DELETING_EMPLOYEE 
} from '../actions/type';

const INITIAL_STATE = {
    name: '',
    phone: '',
    shift: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMPLOYEE_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value }
        case EMPLOYEE_CREATE:
            return INITIAL_STATE;
        case CREATING_EMPLOYEE:
            return {};
        case UPDATING_EMPLOYEE:
            return {};
        case DELETING_EMPLOYEE:
            return {};
        default:
            return state;
    }
}