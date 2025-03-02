import { colors } from '@/constants/tokens'
import { FontAwesome6 } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'

type PlayerControlsProps = {
    style ?: ViewStyle
}

type PlayerButtonProps = {
    style ?: ViewStyle
    iconSize ?: number
}

export const PlayPauseButton = ({
    iconSize,
    style
}:PlayerButtonProps) => {

    const { playing } = useIsPlaying()

    return(
        <View style={[{height: iconSize}, style]}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={{flex:1, width:'100%', alignItems:'center', justifyContent:'center'}}
                onPress={()=>{                    
                    playing ? TrackPlayer.pause() : TrackPlayer.play()
                }}
            >
                <FontAwesome6 name={playing ? 'pause' : 'play'} size={iconSize} color={colors.text}/>
            </TouchableOpacity>
        </View>
    )
}

export const SkipToNextButton = ({
    iconSize,
    style
}: PlayerButtonProps) => {
    return(
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=>{
                TrackPlayer.skipToNext()
            }}
            style={style}
        >
            <FontAwesome6 name="forward" size={iconSize} color={colors.text}/>
        </TouchableOpacity>
    )
}

export const SkipToPreviousButton = ({
    iconSize,
    style
}: PlayerButtonProps) => {
    return(
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=>{
                TrackPlayer.skipToPrevious()
            }}
            style={style}
        >
            <FontAwesome6 name="backward" size={iconSize} color={colors.text}/>
        </TouchableOpacity>
    )
}

export const PlayerControls = ({
    style,
    iconSize
} : PlayerButtonProps) => {
    return(
        <View style={[styles.container, style]}>
            <View style={styles.row}>
                <SkipToPreviousButton iconSize={40} style={styles.pressStyle}/>
                <PlayPauseButton iconSize={40} style={styles.pressStyle}/>
                <SkipToNextButton iconSize={40} style={styles.pressStyle}/>
            </View>
        </View>
    )
}

const styles  = StyleSheet.create({
    container:{
        width:'100%',
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    pressStyle:{
        width:50,
        height:50, 
        alignItems:'center', 
        justifyContent:'center',
    }
})