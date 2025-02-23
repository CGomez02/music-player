import PlaylistTracksList from "@/components/PlaylistTracksList"
import { screenPadding } from "@/constants/tokens"
import { usePlaylists } from "@/store/library"
import { defaultStyles } from "@/styles"
import { Redirect, useLocalSearchParams } from "expo-router"
import { ScrollView, View } from "react-native"

const PlaylistDetailScreen = () => {

    const {name: playlistName} = useLocalSearchParams<{name: string}>()
    const { playlists } = usePlaylists()

    const playlist = playlists.find((playlist) => playlist.name === playlistName)

    if(!playlist){
        console.warn(`Playlist ${playlistName} could not be found`)
        return <Redirect href={"/(tabs)/playlist"}/>
    }

    return(
        <View style={defaultStyles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{paddingHorizontal:screenPadding.horizontal}}
            >
                <PlaylistTracksList playlist={playlist}/>
            </ScrollView>
        </View>
    )
}

export default PlaylistDetailScreen