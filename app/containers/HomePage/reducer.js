/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  CHANGE_USERNAME,
} from './constants';

import {
  CHANGE_PASSWORD,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  username: '',
  password: '',
});

function homeReducer(state = initialState, action) {

  switch (action.type) {

    case CHANGE_USERNAME:

      // Delete prefixed '@' from the github username
      return state.set('username', action.name);

    case  CHANGE_PASSWORD:

    return state.set('password', action.password);


    default:
      return state;
  }
}

export default homeReducer;
