// External imports
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// Application imports
// TODO:
// - Not yet implemented

// Presentation Imports
import IDiagnosticMessage from '@presentation-actions/IDiagnosticAction';

// Action Definition
export interface IIncrementClickCountAction extends IDiagnosticMessage {
  type: 'INCREMENT_CLICK_COUNT';
  randomUuid: string;
}

export interface IDecrementClickCountAction extends IDiagnosticMessage {
  type: 'DECREMENT_CLICK_COUNT';
  randomUuid: string;
}

// Union Action Types
export type Action = IIncrementClickCountAction | IDecrementClickCountAction;

// Action Creators
export const incrementClickCount = (
  randomUuid: {},
  criticalErrorMessages?: string[],
  nonCriticalErrorMessages?: string[],
  warningMessages?: string[],
  informationMessages?: []
): IIncrementClickCountAction => {
  return {
    type: 'INCREMENT_CLICK_COUNT',
    randomUuid,
    criticalErrorMessages,
    nonCriticalErrorMessages,
    warningMessages,
    informationMessages,
  } as IIncrementClickCountAction;
};

export const decrementClickCount = (
  randomUuid: {},
  criticalErrorMessages?: string[],
  nonCriticalErrorMessages?: string[],
  warningMessages?: string[],
  informationMessages?: []
): IDecrementClickCountAction => {
  return {
    type: 'DECREMENT_CLICK_COUNT',
    randomUuid,
    criticalErrorMessages,
    nonCriticalErrorMessages,
    warningMessages,
    informationMessages,
  } as IDecrementClickCountAction;
};

// Thunk Actions
export const thunkClickCountIncrement = (
  someUuid: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  // TODO:
  // Invoke application API methods here
  // - Not yet implemented

  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(incrementClickCount(someUuid));
  };
};

export const thunkClickCountDecrement = (
  someUuid: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  // TODO:
  // Invoke application API methods here
  // - Not yet implemented

  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(decrementClickCount(someUuid));
  };
};
