import * as PropTypes from 'prop-types';
import {Alert, Button} from 'antd';
import React from 'react';

const InitialLoadBlock = ({artistQty, load}) => {

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

  return <div>
    <Alert message={`${tracked} ${conclusion}`} type="info" showIcon/>
    <Button type="primary" style={{marginTop: 20}} onClick={load}>
      Let's go!
    </Button>
  </div>;
};

InitialLoadBlock.propTypes = {
  artistQty: PropTypes.number.isRequired,
  load: PropTypes.func.isRequired
};

export default InitialLoadBlock;