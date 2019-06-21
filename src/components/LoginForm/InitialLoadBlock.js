import * as PropTypes from 'prop-types';
import {Alert, Button} from 'antd';
import React, {PureComponent} from 'react';

class InitialLoadBlock extends PureComponent {

  static propTypes = {
    artistQty: PropTypes.number.isRequired,
    load: PropTypes.func.isRequired
  };

  buttonRef = React.createRef();

  componentDidMount() {
    const {artistQty} = this.props;
    if (artistQty > 0) {
      this.buttonRef.current.buttonNode.focus();
    }
  }


  render() {
    const {artistQty, load} = this.props;

    if (artistQty === 0) {
      const message = <span>
          You have no artists tracked on&nbsp;
        <a target='_blank' rel='noreferrer noopener'
           href="https://www.songkick.com/tracker/artists">Songkick</a>.
          Track some and try again!
    </span>;

      return <Alert message={message} type="warning" showIcon/>;
    }

    const word = artistQty === 1 ? 'artist' : 'artists';
    const tracked = `You have ${artistQty} ${word} tracked.`;
    const conclusion = artistQty < 30 ?
      'It shouldn\'t be long!' :
      'It can take a while.';

    return <>
      <Alert message={`${tracked} ${conclusion}`} type="info" showIcon/>
      <Button ref={this.buttonRef} type="primary" style={{marginTop: 20}}
              onClick={load}>
        Let's go!
      </Button>
    </>;
  }
}

export default InitialLoadBlock;