// External imports
import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Presentation imports
import '@presentation-components/orchestrator/Orchestrator.scss';
import UnderConstruction from '@presentation-components/underConstruction/UnderConstruction';
import { IRootState } from '../../store';

interface IState {}
interface IStateProps {}
interface ISelfProps {}
interface IDispatchProps {}

type Props = IStateProps & ISelfProps & IDispatchProps;

class Orchestrator extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="orchestrator">
        <Router>
          <Switch>
            <Route path="/">
              <UnderConstruction />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (
  states: IRootState,
  selfProps: ISelfProps
): IStateProps => {
  return {};
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
  selfProps: ISelfProps
): IDispatchProps => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Orchestrator);
