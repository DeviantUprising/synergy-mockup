// External imports
import { combineReducers } from 'redux';

// Presentation imports
import { Action } from '@presentation-actions/contextForExampleAction/exampleAction';

export interface ICurrentCount {
  count: number;
  randomUuid: string;
}

export interface IState {
  currentCount: ICurrentCount;
}

const initialState: ICurrentCount = {
  count: 0,
  randomUuid: '',
};

const currentCount = (
  state: ICurrentCount = initialState,
  action: Action
): ICurrentCount => {
  switch (action.type) {
    case 'INCREMENT_CLICK_COUNT':
      return {
        ...state,
        count: state.count + 1,
        randomUuid: action.randomUuid,
      };
    case 'DECREMENT_CLICK_COUNT':
      return {
        ...state,
        count: state.count - 1,
        randomUuid: action.randomUuid,
      };
    default:
      break;
  }
  return state;
};

export default combineReducers<IState>({
  currentCount,
});
