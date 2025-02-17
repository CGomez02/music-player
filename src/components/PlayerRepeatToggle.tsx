import { colors } from '@/constants/tokens';
import { useTrackPlayerRepeatMode } from '@/hooks/useTrackPlayerRepeatMode';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { ViewStyle } from 'react-native';
import { RepeatMode } from 'react-native-track-player';
import { match } from 'ts-pattern';

interface PlayerRepeatToggleProps {
    size: number,
    style: ViewStyle,
    iconProps?: IconProps
}
const repeatOrder = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue] as const
type IconName = ComponentProps<typeof MaterialCommunityIcons>['name']
type IconProps = Omit<ComponentProps<typeof MaterialCommunityIcons>, 'name'>

const PlayerRepeatToggle: React.FC<PlayerRepeatToggleProps> = ({
    size,
    style,
    iconProps
}) => {


    const {changeRepeatMode, repeatMode } = useTrackPlayerRepeatMode()

    const toggleRepeatMode = () => {
        if(repeatMode === null) return
        const currentIndex = repeatOrder.indexOf(repeatMode as any)
        const nextIndex = (currentIndex+1) % repeatOrder.length
        changeRepeatMode(repeatOrder[nextIndex])
    }

    
    const icon = match(repeatMode)
                .returnType<IconName>()
                .with(RepeatMode.Off, () => 'repeat-off')
                .with(RepeatMode.Track, () => 'repeat-once')
                .with(RepeatMode.Queue, () => 'repeat')
                .otherwise(() => 'repeat-off')
                return <MaterialCommunityIcons size={size} name={icon} onPress={toggleRepeatMode} style={style} color={colors.icon} {...iconProps}/>
};

export default PlayerRepeatToggle;