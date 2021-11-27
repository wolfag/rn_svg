import React from 'react';
import {View, Dimensions} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const {width, height} = Dimensions.get('screen');

export default function Genealogy() {
  return (
    <Svg
      width={width}
      height={height}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
      }}>
      <Path
        d={'M350,400 L350 340 A 40,40 1 0 1 310,300 L50 300'}
        stroke="red"
        strokeWidth={6}
        fill="none"
        strokeDasharray={'30,10'}
        strokeDashoffset={10}
      />
    </Svg>
  );
}
