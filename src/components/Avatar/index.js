// // @flow

import React from 'react';
import Image from '../Image';

export default function Avatar({url, name, width}) {
  const alt = name ? `${name}'s avatar` : 'User avatar';
  return (
    <Image
      style={{borderRadius: 8}}
      src={`${url}&s=${width * 2}`}
      alt={alt}
      width={width}
    />
  );
}

