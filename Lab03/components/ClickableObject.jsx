import React, { useContext, useRef } from 'react';
import { Text, Animated, StyleSheet } from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  GestureHandlerRootView,
  State,
} from 'react-native-gesture-handler';
import { GameContext } from '../App';

export default function ClickableObject() {
  const { score, setScore, counts, setCounts, updateTasks } = useContext(GameContext);

  const panRef = useRef();
  const flingLeftRef = useRef();
  const flingRightRef = useRef();
  const pinchRef = useRef();
  const longPressRef = useRef();
  const doubleTapRef = useRef();
  const singleTapRef = useRef();

  const pan = useRef(new Animated.ValueXY()).current;

  const handleGesture = (type, value = 1) => {
    setCounts(prev => ({ ...prev, [type]: prev[type] + 1 }));
    setScore(prev => prev + value);
    updateTasks();
  };

  const onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: pan.x, translationY: pan.y } }],
    { useNativeDriver: false }
  );

  const onPanHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      pan.extractOffset();
      handleGesture('pan', 0);
    }
  };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler
        ref={panRef}
        onGestureEvent={onPanGestureEvent}
        onHandlerStateChange={onPanHandlerStateChange}
        simultaneousHandlers={[flingLeftRef, flingRightRef, pinchRef, longPressRef, doubleTapRef, singleTapRef]}
      >
        <FlingGestureHandler
        ref={flingRightRef}
        direction={8}
        onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
            handleGesture('swipeRight', 5);
            pan.setValue({ x: 0, y: 0 });}
        }}
        simultaneousHandlers={[panRef]}
        shouldCancelWhenOutside={false}
        >

        <FlingGestureHandler
        ref={flingRightRef}
        direction={8}
        onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
            handleGesture('swipeRight', 5);
            pan.setValue({ x: 0, y: 0 });}
        }}
        simultaneousHandlers={[panRef]}
        shouldCancelWhenOutside={false}
        >

            <PinchGestureHandler
              ref={pinchRef}
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.END) handleGesture('pinch', 5);
              }}
              simultaneousHandlers={[panRef]}
            >
              <LongPressGestureHandler
                ref={longPressRef}
                minDurationMs={3000}
                onHandlerStateChange={({ nativeEvent }) => {
                  if (nativeEvent.state === State.ACTIVE) handleGesture('longPress', 10);
                }}
                simultaneousHandlers={[panRef]}
              >
                <TapGestureHandler
                  ref={doubleTapRef}
                  numberOfTaps={2}
                  onActivated={() => handleGesture('doubleTap', 2)}
                  simultaneousHandlers={[singleTapRef, panRef]}
                >
                  <TapGestureHandler
                    ref={singleTapRef}
                    onActivated={() => handleGesture('tap', 1)}
                    simultaneousHandlers={[doubleTapRef, panRef]}
                  >
                    <Animated.View style={[styles.box, { transform: pan.getTranslateTransform() }]}>
                      <Text style={styles.emoji}>🎯</Text>
                    </Animated.View>
                  </TapGestureHandler>
                </TapGestureHandler>
              </LongPressGestureHandler>
            </PinchGestureHandler>
          </FlingGestureHandler>
        </FlingGestureHandler>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#aee1f9',
    padding: 40,
    borderRadius: 100,
    marginBottom: 30,
    alignItems: 'center',
    alignSelf: 'center',
  },
  emoji: {
    fontSize: 40,
  },
});
