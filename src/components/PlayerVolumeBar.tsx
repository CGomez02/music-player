import { colors } from '@/constants/tokens';
import { useTackPlayerVolume } from '@/hooks/useTackPlayerVolume';
import { utilsStyles } from '@/styles';
import { Ionicons } from '@expo/vector-icons';
import { View, ViewStyle } from 'react-native';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';

interface PlayerVolumeBarProps {
    style: ViewStyle
}

const PlayerVolumeBar: React.FC<PlayerVolumeBarProps> = ({
    style
}) => {

    const { volume, updateVolume } = useTackPlayerVolume()
    const progress = useSharedValue(0)
    const min = useSharedValue(0)
    const max = useSharedValue(1)

    progress.value = volume ?? 0

    return (
        <View style={[style]}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Ionicons name='volume-low' size={20} color={colors.icon} style={{opacity:0.8}}/>
                <View style={{flex:1, flexDirection:'row', paddingHorizontal:10}}>
                    <Slider 
                        progress={progress}
                        minimumValue={min}
                        maximumValue={max}
                        thumbWidth={0}
                        theme={{maximumTrackTintColor: colors.maximunTrackTintColor, minimumTrackTintColor:colors.minimumTrackTintColor}}
                        containerStyle={utilsStyles.slider}
                        renderBubble={() => null}
                        // onSlidingStart={()=> (isSliding.value = true)}
                        onValueChange={(value) => { updateVolume(value)}}
                        // onSlidingComplete={async(value)=> {
                        //     if(!isSliding.value) return
                        //     isSliding.value = false
                        //     await TrackPlayer.seekTo(value*duration)
                        // }}
                    />
                </View>
                <Ionicons name='volume-high' size={20} color={colors.icon} style={{opacity:0.8}}/>
            </View>
        </View>
    );
};

export default PlayerVolumeBar;