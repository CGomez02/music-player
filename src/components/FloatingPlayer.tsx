import { unknownTrackImgeUri } from '@/constants/images';
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack';
import { defaultStyles } from '@/styles';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useActiveTrack } from 'react-native-track-player';
import { MovingText } from './MovingText';
import { PlayPauseButton, SkipToNextButton } from './PlayerControls';

interface FloatingPlayerProps {
    style: ViewStyle
}

const FloatingPlayer: React.FC<FloatingPlayerProps> = ({
    style
}) => {

    const {  navigate } = useRouter()
    const activeTrack = useActiveTrack()
    const lastActiveTrack = useLastActiveTrack()
    const displayedTrack = activeTrack ?? lastActiveTrack
    if(!displayedTrack) return null

    const handlepress = () => {
        navigate('/player')
    }

    return (
        <TouchableOpacity
            style={[styles.container, style]}
            activeOpacity={0.9}
            onPress={handlepress}
        >
            <>
                <FastImage 
                    source={{
                        uri: displayedTrack.artwork ?? unknownTrackImgeUri
                    }}
                    style={styles.trackArtworkImage}
                />
                <View style={styles.trackTitleContainer}>
                <MovingText 
                    text={displayedTrack.title ?? ""}
                    animationThreshold={25}
                    style={styles.trackTitle}

                />                    
                </View>

                <View style={styles.trackControlsContainer}>
                    <PlayPauseButton iconSize={24} />
                    <SkipToNextButton iconSize={24}/>
                </View>
            </>
        </TouchableOpacity>
    );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:"#252525",
        padding:8,
        paddingVertical:10,
        borderRadius:12
    },
    trackArtworkImage:{
        width:40,
        height:40,
        borderRadius:8
    },
    trackTitleContainer:{
        flex:1,
        overflow:'hidden',
        marginLeft:10
    },
    trackTitle:{
        ...defaultStyles.text,
        paddingLeft:10,
        fontWeight:'600',
        fontSize:18
    },
    trackControlsContainer:{
        flexDirection:'row',
        alignItems:'center',
        columnGap:20,
        marginRight:16,
        paddingLeft:16
    }
})