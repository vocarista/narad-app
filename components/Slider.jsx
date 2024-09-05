import React, { useState, useRef } from 'react';
import { View, Text, PanResponder, Animated, StyleSheet, Dimensions } from 'react-native';
import Card from '../components/Card'

export default function Slider() {
  const [isUp, setIsUp] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy < -150) {
          setIsUp(true);
          Animated.spring(pan, {
            toValue: { x: 0, y: -screenHeight + 300 }, 
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dy > 150) {         
          setIsUp(false);
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: isUp ? -screenHeight + 300 : 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.slider,
        {
          transform: [{ translateY: pan.y }],
          width: isUp ? screenWidth : screenWidth,
        },
        isUp && { height: screenHeight },
      ]}
    >
      <View style={styles.content}>
       <Card></Card>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  slider: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 300, // Default height when collapsed
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10, // For shadow effect
  },
  content: {
    padding: 16,
  },
});

