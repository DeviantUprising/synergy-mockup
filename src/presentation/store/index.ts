// External imports
import { combineReducers } from 'redux';

// Presentation imports
import currentCount, {
  IState as ICurrentCountState,
} from '@presentation-reducers/contextForExampleReducer/exampleReducer';

export interface IRootState {
  currentCount: ICurrentCountState;
}

export default combineReducers<IRootState>({
  currentCount,
});
