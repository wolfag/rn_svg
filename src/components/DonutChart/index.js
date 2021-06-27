import React, {useRef, useEffect, useCallback} from 'react';
import {View, StyleSheet, Animated, TextInput} from 'react-native';
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
  Text,
} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

export default function DonutChart({
  percentage = 75,
  radius = 40,
  strokeWidth = 10,
  duration = 500,
  color = 'tomato',
  delay = 0,
  textColor,
  max = 100,
}) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const animation = useCallback(
    toValue => {
      return Animated.timing(animatedValue, {
        toValue,
        duration,
        delay,
        useNativeDriver: true,
      }).start(() => {
        animation(toValue === 0 ? percentage : 0);
      });
    },
    [animatedValue, duration, delay, percentage],
  );

  const circleRef = useRef();
  const inputRef = useRef();

  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;

  useEffect(() => {
    animation(percentage);

    animatedValue.addListener(v => {
      if (circleRef?.current) {
        const maxPercentage = (100 * v.value) / max;
        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPercentage) / 100;

        circleRef.current.setNativeProps({strokeDashoffset});
      }

      if (inputRef?.current) {
        inputRef.current.setNativeProps({text: `${Math.round(v.value)}`});
      }
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [
    circleCircumference,
    percentage,
    circleRef,
    animatedValue,
    animation,
    max,
  ]);

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
      }}>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            strokeOpacity={0.2}
            fill="transparent"
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <AnimatedInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          {
            fontSize: radius / 2,
            color: textColor ?? color,
          },
          {
            fontWeight: '900',
            textAlign: 'center',
          },
        ]}
      />
    </View>
  );
}
