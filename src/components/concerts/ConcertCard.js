import React from 'react';
import * as PropTypes from 'prop-types';
import {Card, Icon, Popover} from 'antd';
import styles from './ConcertList.module.scss';

function ConcertCard({concert}) {
  const titleText = concert.members.map(it => it.displayName).join(', ');
  const title = <div>
    <Popover content={titleText}>
      <div className={styles.cutText}>{titleText}</div>
    </Popover>
  </div>;

  const actions = [
    <span>&nbsp;</span>,
    <a href={concert.uri} rel='noopener noreferrer' target='_blank'><Icon
      type="export"/> Songkick</a>
  ];

  const distance = concert.distance ?
    <span> (~{concert.distance}km)</span> :
    null;

  return <Card size='small' title={title}
               actions={actions}
               bodyStyle={{height: 120}}
               style={{marginBottom: 20}}>
    <div className={styles.bodyLine}>
      <Icon type="environment"/> {concert.location.city}{distance}
    </div>
    <div className={styles.bodyLine}>
      <Icon type="calendar"/> {concert.start}
    </div>
    <Popover content={concert.displayName}>
      <div className={styles.cutText}>{concert.displayName}</div>
    </Popover>
  </Card>;
}

ConcertCard.propTypes = {
  concert: PropTypes.object.isRequired
};

export default ConcertCard;