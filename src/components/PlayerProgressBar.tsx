import { colors } from '@/constants/tokens';
import { formatSecondToMinute } from '@/helpers/miscellaneuos';
import { defaultStyles, utilsStyles } from '@/styles';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Slider, } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import TrackPlayer, { useProgress } from 'react-native-track-player';

interface PlayerProgressBarProps {
    style: ViewStyle
}

const PlayerProgressBar: React.FC<PlayerProgressBarProps> = ({
    style
}) => {

    const { duration,  position} = useProgress(250)
    const isSliding = useSharedValue(false)
    const progress = useSharedValue(0)
    const min = useSharedValue(0)
    const max = useSharedValue(1)
    const trackElapsedTime = formatSecondToMinute(position)
    const trackRemainingTime = formatSecondToMinute(duration - position)

    if(!isSliding.value){
        progress.value = duration > 0 ? position / duration : 0
    }

    return (
        <View style={[style]}>
            <Slider 
                progress={progress}
                minimumValue={min}
                maximumValue={max}
                thumbWidth={0}
                theme={{maximumTrackTintColor: colors.maximunTrackTintColor, minimumTrackTintColor:colors.minimumTrackTintColor}}
                containerStyle={utilsStyles.slider}
                renderBubble={() => null}
                onSlidingStart={()=> (isSliding.value = true)}
                onValueChange={async(value) => { await TrackPlayer.seekTo(value * duration)}}
                onSlidingComplete={async(value)=> {
                    if(!isSliding.value) return
                    isSliding.value = false
                    await TrackPlayer.seekTo(value*duration)
                }}
            />
            <View style={styles.trackTimeContainer}>
                <Text style={styles.time}>{trackElapsedTime}</Text>
                <Text style={styles.time}>{trackRemainingTime}</Text>
            </View>
        </View>
    );
};

export default PlayerProgressBar;

const styles = StyleSheet.create({
    trackTimeContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:5
    },
    time:{
        ...defaultStyles.text,
        fontSize:12
    }
})