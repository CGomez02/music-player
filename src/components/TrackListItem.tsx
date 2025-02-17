import { unknownTrackImgeUri } from "@/constants/images"
import { colors, fontSize } from "@/constants/tokens"
import { defaultStyles } from "@/styles"
import { Entypo, Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableHighlight, View } from "react-native"
import FastImage from "react-native-fast-image"
import LoaderKit from 'react-native-loader-kit'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player'

export type TrackListItemProps = {
    track: Track,
    onTrackSelect: (track : Track) => void
}
export const TrackListItem = ({ track, onTrackSelect : handleTrackSelect}: TrackListItemProps) => {

    const { playing } = useIsPlaying()
    const isActiveTrack = useActiveTrack()?.url === track.url;

    return (
        <TouchableHighlight 
            onPress={()=> handleTrackSelect(track)}
        >
            <View style={styles.trackItemContainer}>
                <View>
                    <FastImage
                        source={{
                            uri: track.artwork ?? unknownTrackImgeUri,
                            priority: FastImage.priority.normal
                        }}
                        style={{
                            ...styles.trackArtworkImage,
                            opacity: isActiveTrack ? 0.6 : 1
                        }}
                    />
                        {
                            isActiveTrack && (playing ? <LoaderKit style={styles.trackPlayingIconIndicator} name="LineScaleParty" color={colors.icon} /> : <Ionicons  style={styles.trackPlayingIconIndicatorPaused} name="play" size={24} color={colors.icon}/>)
                        }
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', flex:1}}>
                    <View style={{ width: '100%' }}>
                        <Text
                            numberOfLines={1}
                            style={{
                                ...styles.trackTitleText,
                                color: isActiveTrack ? colors.primary : colors.text
                            }}
                        >
                            {track.title}
                        </Text>
                        {
                            track.artist && (
                                <Text numberOfLines={1} style={styles.trackArtisttext}>{track.artist}</Text>
                            )
                        }
                    </View>
                    <Entypo name="dots-three-horizontal" size={18} color={colors.icon}/>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    trackItemContainer: {
        flexDirection: 'row',
        columnGap: 14,
        alignItems: 'center',
        paddingRight: 20
    },
    trackArtworkImage: {
        borderRadius: 8,
        width: 50,
        height: 50
    },
    trackTitleText: {
        ...defaultStyles.text,
        fontSize: fontSize.sm,
        fontWeight: '600',
        maxWidth: '90%'
    },
    trackArtisttext: {
        ...defaultStyles.text,
        color: colors.textMuted,
        fontSize: 14,
        marginTop: 4
    },
    trackPlayingIconIndicator: {
       position:'absolute',
       top:15,
       left:18,
       width:16,
       height:16
    },
    trackPlayingIconIndicatorPaused: {
        position:'absolute',
        top:10,
        left:14,
     }
})