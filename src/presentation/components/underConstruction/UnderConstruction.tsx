// External imports
import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { v4 as uuidv4 } from 'uuid';

// Presentation imports
import '@presentation-components/underConstruction/UnderConstruction.scss';
import {
  thunkClickCountIncrement,
  thunkClickCountDecrement,
} from '@presentation-actions/contextForExampleAction/exampleAction';
import { ICurrentCount } from '@presentation-reducers/contextForExampleReducer/exampleReducer';
import { IRootState } from '../../store';

interface IState {}
interface IStateProps {
  currentCount: ICurrentCount;
}
interface ISelfProps {}
interface IDispatchProps {
  thunkClickCountIncrement: (randomUuid: string) => void;
  thunkClickCountDecrement: (randomUuid: string) => void;
}

type Props = IStateProps & ISelfProps & IDispatchProps;

class UnderConstruction extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="under-construction">
        <p>Under Construction...</p>
        <p>But here is something to keep you entertained!</p>
        <button
          type="button"
          onClick={() => this.props.thunkClickCountIncrement(uuidv4())}
        >
          Increment count
        </button>
        <button
          type="button"
          onClick={() => this.props.thunkClickCountDecrement(uuidv4())}
        >
          Decrement count
        </button>
        <p>
          currentCount:
          {this.props.currentCount ? this.props.currentCount.count : 0}
        </p>
        <p>
          Random uuid:
          {this.props.currentCount ? this.props.currentCount.randomUuid : ''}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (
  states: IRootState,
  selfProps: ISelfProps
): IStateProps => {
  return {
    currentCount: states.currentCount.currentCount,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
  selfProps: ISelfProps
): IDispatchProps => {
  return {
    thunkClickCountIncrement: async (randomUuid: string) => {
      await dispatch(thunkClickCountIncrement(randomUuid));
    },
    thunkClickCountDecrement: async (randomUuid: string) => {
      await dispatch(thunkClickCountDecrement(randomUuid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnderConstruction);
