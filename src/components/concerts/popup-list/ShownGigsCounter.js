// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd';
import {toggleShownGigsPopup} from '../../../store/actions/map';
import {countShownConcerts} from './selectors';
import styles from './ShownGigsCounter.module.less';

type ShownGigsCounterProps = {
  qtyOnMap: number,
  toggleShownGigsPopup: Function
};

const wrapQty = (qty: number) => (
  <span className={styles.qty}>{qty}</span>
);

const makeText = (qty: number) => {
  if (qty === 0) {
    return (
      <span>{wrapQty(0)} gigs shown</span>
    );
  }

  const word = qty > 1 ? 'gigs' : 'gig';
  return (
    <span>See&nbsp;{wrapQty(qty)}&nbsp;{word} info</span>
  );
};

export const ShownGigsCounter = (props: ShownGigsCounterProps) => {
  const {toggleShownGigsPopup, qtyOnMap} = props;
  const open = (e) => {
    e.target.blur();
    toggleShownGigsPopup(true);
  };

  return (
    <div className={styles.wrapper}>
      <Button icon={'eye'} onClick={open} disabled={qtyOnMap === 0}>
        {makeText(qtyOnMap)}
      </Button>
    </div>
  );
};

const MemoShownGigsCounter = React.memo(ShownGigsCounter);

const mapStateToProps = (state) => ({
  qtyOnMap: countShownConcerts(state)
});

const mapDispatchToProps = {
  toggleShownGigsPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(MemoShownGigsCounter);