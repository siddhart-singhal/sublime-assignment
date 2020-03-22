import { handleActions } from 'redux-actions';

export const OrderStore = [];

export default handleActions({
    INSERT_NEW_ORDER: (state, { payload }) => (state.push(payload), state),
    DELETE_ORDER_DETAILS: (state, { payload }) => state.filter(({ uuid }) => payload !== uuid)
}, OrderStore);
