import { unknownTrackImgeUri } from '@/constants/images'
import { useQueue } from '@/store/queue'
import { utilsStyles } from '@/styles'
import { useRef } from 'react'
import { FlatList, FlatListProps, Text, View } from "react-native"
import FastImage from 'react-native-fast-image'
import TrackPlayer, { Track } from 'react-native-track-player'
import { QueueControls } from './QueueControls'
import { TrackListItem } from './TrackListItem'


export type TrackListProps = Partial<FlatListProps<Track>> & {
    id: string
    tracks: Track[]
    hideQueueControls ?: boolean
}

const ItemDivider = () => {
    return <View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />

}

export const TrackList = ({id,  tracks, hideQueueControls = false, ...flatlistProps }: TrackListProps) => {

    const queueOffset = useRef(0)
    const { activeQueueId, setActiveQueueId } = useQueue()

    const handleTrackSelect = async(selectedTrack: Track) => {
        const trackIndex = tracks.findIndex(track => track.url === selectedTrack.url)
        if(trackIndex === -1) return

        const isChangingQueue = id !== activeQueueId
        if(isChangingQueue){
            const beforeTracks = tracks.slice(0, trackIndex)
            const afterTracks = tracks.slice(trackIndex + 1)
            await TrackPlayer.reset()
            // Contruction of new queue
            await TrackPlayer.add(selectedTrack)
            await TrackPlayer.add(afterTracks)
            await TrackPlayer.add(beforeTracks)
            //
            await TrackPlayer.play()

            queueOffset.current = trackIndex
            setActiveQueueId(id)

        }else{
            const nextTrackIndex = trackIndex - queueOffset.current < 0 
            ? tracks.length + trackIndex - queueOffset.current 
            : trackIndex - queueOffset.current
            
            await TrackPlayer.skip(nextTrackIndex)
            await TrackPlayer.play()

        }
    //    await TrackPlayer.load(track)
    //    await TrackPlayer.play()
    }

    return (
        <FlatList
            data={tracks}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 100 }}
            ItemSeparatorComponent={ItemDivider}
            ListFooterComponent={ tracks.length > 0 ? ItemDivider : null}
            ListHeaderComponent={ !hideQueueControls ? <QueueControls tracks={tracks} style={{paddingBottom:20}}/> : undefined}
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