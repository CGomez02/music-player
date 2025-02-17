import { useEffect } from 'react';
import Animated, { cancelAnimation, Easing, StyleProps, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';

export interface MovingTextProps {
    text: string
    animationThreshold: number
    style ?: StyleProps
}

export const MovingText: React.FC<MovingTextProps> = ({
    style,
    animationThreshold,
    text
}) => {
    const traslateX = useSharedValue(0)
    const shouldAnimate = text.length >= animationThreshold 
    const textWidth = text.length * 3

    useEffect(()=>{
        if(!shouldAnimate) return
        traslateX.value = withDelay(1000, withRepeat(withTiming(
            -textWidth, {
                duration: 5000,
                easing:Easing.linear
            }
        ), -1, true))

        return () => {
            cancelAnimation(traslateX)
            traslateX.value = 0
        }
    },[text, traslateX, animationThreshold, shouldAnimate, textWidth])

    const animatedStyle = useAnimatedStyle(()=>{
        return{
            transform:[
                {
                    translateX: traslateX.value
                }
            ]
        }
    })

    return (
        <Animated.Text
            numberOfLines={1}
            style={[style, animatedStyle,
                shouldAnimate && { width: 9999, paddingLeft:16}
            ]}
        >
            {text}
        </Animated.Text>
    );
};

