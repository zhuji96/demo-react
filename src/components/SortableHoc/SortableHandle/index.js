import * as React from 'react';
import {findDOMNode} from 'react-dom';

import {provideDisplayName} from '../utils';

export default function sortableHandle(
  WrappedComponent,
  config = {withRef: false},
) {
  return class WithSortableHandle extends React.Component {
    static displayName = provideDisplayName('sortableHandle', WrappedComponent);

    componentDidMount() {
      const node = findDOMNode(this);
      node.sortableHandle = true;
    }

    getWrappedInstance() {
      return this.refs.wrappedInstance;
    }

    render() {
      const ref = config.withRef ? 'wrappedInstance' : null;

      return <WrappedComponent ref={ref} {...this.props} />;
    }
  };
}

export function isSortableHandle(node) {
  return node.sortableHandle != null;
}
