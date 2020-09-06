// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {Modal} from 'antd';
import {toggleShownGigsPopup} from '../../../store/reducers/map/actions';
import {getShownConcerts} from './selectors';
import {default as GigTable} from './GigTable';
import type {Concert} from '../../../types';

type CheckboxFilterDialogProps = {
  toggleShownGigsPopup: Function,
  isOpen: boolean,
  concerts: Concert[]
};

export const ShownGigsPopup = (props: CheckboxFilterDialogProps) => {
  const {
    toggleShownGigsPopup,
    isOpen,
    concerts
  } = props;

  const close = () => toggleShownGigsPopup(false);

  return (
    <Modal
      width={'85%'}
      title={`Shown gigs details`}
      visible={isOpen}
      onCancel={close}
      footer={null}
      bodyStyle={{padding: 5}}
    >
        <GigTable concerts={concerts} />
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.map.shownGigsPopupOpen,
  concerts: getShownConcerts(state)
});

const mapDispatchToProps = {
  toggleShownGigsPopup
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ShownGigsPopup));