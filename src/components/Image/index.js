// @flow

import React, {
  Component,
} from 'react';
import styles from './index.css';

import classNames from 'classnames';
import LoadingSpinner from '../Loading/loading.svg';

class Image extends Component {

  static defaultProps = {
    minHeight: 60,
  };

  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
    };
  }

  onImageLoad = () => {
    this.setState(() => ({
      status: 'loaded',
    }));
  }

  renderSpinner() {
    if (this.state.status === 'loaded') {return null;}
    return (
      <LoadingSpinner
        className={styles.spiner}
        width={28}
        height={28}
      />
    );
  }

  render() {
    const {
      minHeight,
      className,
      ...restProps
    } = this.props;

    return (
      <div
        className={styles.image}
        style={{minHeight}}
      >
        <img
          alt=""
          className={styles['u-imgResponsive']}
          {...restProps}
          onLoad={this.onImageLoad}
        />
        {this.renderSpinner()}
      </div>
    );
  }

}


export default Image;
