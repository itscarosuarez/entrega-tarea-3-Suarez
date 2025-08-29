import { Colors } from '@/constants/Colors';
import { useEffect } from 'react';
import { Animated, StyleSheet, Text, TextStyle, useColorScheme } from 'react-native';

type Props = {
  name?: string;
  style?: TextStyle;
  type?: string;
  children?: React.ReactNode;
};

export const Greetings = ({ name, style, children }: Props) => {
  const colorScheme = useColorScheme();
  const bounceValue = new Animated.Value(0);
  
  useEffect(() => {
    Animated.spring(bounceValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { scale: bounceValue },
            { 
              rotate: bounceValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              })
            }
          ]
        }
      ]}
    >
      <Text 
        style={[
          styles.text,
          {
            color: Colors[colorScheme ?? 'light'].text,
          },
          style
        ]}
      >
        {children || `¡Hola ${name}! ✨`}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(161, 206, 220, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});