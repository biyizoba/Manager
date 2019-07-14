import {
    FETCH_EMPLOYEES_SUCCESSFUL,
    FETCHING_EMPLOYEES,
    FETCHING_EMPLOYEES_FAILED
} from '../actions/type';

const INITIAL_STATE = {
    loading: false,
    employees: [],
    error: null
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case FETCH_EMPLOYEES_SUCCESSFUL:
            return { ...state, loading: false, employees: action.payload }
        case FETCHING_EMPLOYEES:
            return { ...state, loading: true }
        case FETCHING_EMPLOYEES_FAILED:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}