import { combineReducers } from 'redux';
import { SHOW_PROVINCE_RESULT, HIDE_PROVINCE_RESULT, SET_PROJECTION } from './actions';
import * as d3 from 'd3';

function provinceResultVisible(state = -1, action) {
    switch(action.type) {
        case SHOW_PROVINCE_RESULT:
            return action.index;
        case HIDE_PROVINCE_RESULT:
            return -1;
        default: 
            return state;
    }
}

export default combineReducers({provinceResultVisible});