import { utilsStyles } from '@/styles'
import { FlatList, FlatListProps, View } from "react-native"
import { TrackListItem } from './TrackListItem'

export type TrackListProps = Partial<FlatListProps<unknown>> & {
    tracks: any[]
}

const ItemDivider = () => {
    return <View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />

}

export const TrackList = ({ tracks, ...flatlistProps }: TrackListProps) => {
    return (
        <FlatList
            data={tracks}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 100 }}
            ItemSeparatorComponent={ItemDivider}
            ListFooterComponent={ItemDivider}
            renderItem={({ item: track }) => (
                <TrackListItem
                    track={{
                        ...track,
                        image: track.artwork
                    }}
                />
            )}
            {...flatlistProps}
        />
    )
}