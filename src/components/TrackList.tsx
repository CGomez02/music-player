import { unknownTrackImgeUri } from '@/constants/images'
import { utilsStyles } from '@/styles'
import { FlatList, FlatListProps, Text, View } from "react-native"
import FastImage from 'react-native-fast-image'
import TrackPlayer, { Track } from 'react-native-track-player'
import { TrackListItem } from './TrackListItem'


export type TrackListProps = Partial<FlatListProps<Track>> & {
    tracks: Track[]
}

const ItemDivider = () => {
    return <View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />

}

export const TrackList = ({ tracks, ...flatlistProps }: TrackListProps) => {

    const handleTrackSelect = async(track: Track) => {
       await TrackPlayer.load(track)
       await TrackPlayer.play()
    }

    return (
        <FlatList
            data={tracks}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 100 }}
            ItemSeparatorComponent={ItemDivider}
            ListFooterComponent={ tracks.length > 0 ? ItemDivider : null}
            ListEmptyComponent={
                <View>
                    <Text style={utilsStyles.emptyContentText}>No Songs Found</Text>
                    <FastImage 
                        source={{uri: unknownTrackImgeUri, priority: FastImage.priority.normal}}
                        style={utilsStyles.emptyContentImage}
                    />
                </View>
            }
            renderItem={({ item: track }: {item: any}) => (
                <TrackListItem
                    track={track}
                    onTrackSelect={handleTrackSelect}
                />
            )}
            {...flatlistProps}
        />
    )
}