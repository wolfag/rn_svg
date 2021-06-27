/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, Dimensions} from 'react-native';

import DonutChart from './src/components/DonutChart';

const {width} = Dimensions.get('screen');

const data = [
  {
    percentage: 8,
    color: 'tomato',
    max: 10,
  },
  {
    percentage: 14,
    color: 'skyblue',
    max: 20,
  },
  {
    percentage: 92,
    color: 'gold',
    max: 100,
  },
  {
    percentage: 240,
    color: '#222',
    max: 500,
    radius: width / 2 - 40,
  },
];

const App = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        marginTop: 100,
      }}>
      {data.map((d, i) => {
        return <DonutChart key={i} {...d} />;
      })}
    </SafeAreaView>
  );
};

export default App;
