// @flow
import {connect} from 'react-redux';
import {toggleMobileSidebar} from '../../../../store/actions/ui';
import {StaticNavLinks} from '../../navigation/nav-links/static/StaticNavLinks';

const mapDispatchToProps = {toggleMobileSidebar};

export const ConnectedMobileNavLinks =
  connect(null, mapDispatchToProps)(StaticNavLinks);