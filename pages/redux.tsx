import App from '../components/App/App';
import * as React from 'react';
import * as actions from '../redux/enthusiasm/actions/index';
import { RootState } from '../redux/store/root-state';
import { Props } from '../redux/enthusiasm/types/enthusiasm';
import { Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../redux/store/index';

interface ReduxStore {
  dispatch: Function;
  getState: Function;
}

interface ReduxWrapper {
  store: ReduxStore;
  isServer: boolean;
}

export class Redux extends React.Component<Props> {
  static getInitialProps({ store, isServer }: ReduxWrapper) {
    if (isServer) {
      // For examples of async actions, check out 
      //  https://github.com/kirill-konshin/next-redux-wrapper#async-actions-in-getinitialprops
      store.dispatch(actions.incrementEnthusiasm());
      store.dispatch(actions.incrementEnthusiasm());
      store.dispatch(actions.incrementEnthusiasm());
      store.dispatch(actions.incrementEnthusiasm());
    }
    return { custom: 'customText' };
  }

  render() {
    const { enthusiasm, onIncrement, onDecrement } = this.props;
    return (
      <App>
        <div className="myDiv">
          <h1>Redux [DEMO]</h1>
          <div className="greeting">
            Hello {this.getExclamationMarks(enthusiasm.enthusiasmLevel)}
          </div>
          <div>
            <button onClick={onDecrement}>-</button>
            <button onClick={onIncrement}>+</button>
          </div>
          <pre>
            {JSON.stringify(this.props)}
          </pre>
        </div>
        <style>{`
        img {
          width: 300px;
          height: 300px;
          }
        h1 {
          font-family: Arial;
        }
        .myDiv {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
      `}</style>      
      </App>
    );
  }

  getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
  }
}

const mapStateToProps = ({ enthusiasm }: RootState) => {
  return {
    enthusiasm
  };
};

const mapDispatchToProps = (dispatch: Dispatch<actions.EnthusiasmAction>) => {
  return {
    onIncrement: bindActionCreators(actions.incrementEnthusiasm, dispatch),
    onDecrement: bindActionCreators(actions.decrementEnthusiasm, dispatch)
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Redux);
