import PlaylistList from "@/components/PlaylistList";
import { screenPadding } from "@/constants/tokens";
import { playlistNameFilter } from "@/helpers/filter";
import { Playlist } from "@/helpers/types";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { usePlaylists } from "@/store/library";
import { defaultStyles } from "@/styles";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";

const PlayListScreen = () => {

    const { navigate, push } = useRouter()

    const search = useNavigationSearch({
        title:'Playlist',
        searchBarOptions:{
            placeholder:'Search in playlist',
            hideWhenScrolling:true

        }
    })

    const {playlists} = usePlaylists()

    const filteredPlaylists = useMemo(()=> {
        return playlists.filter(playlistNameFilter(search))
    },[playlists, search])

    const handlePlaylistPress = (playlist: Playlist) => {                
        navigate(`/(tabs)/playlist/${playlist.name}`)
    }

    return (

        <View style={defaultStyles.container}>
            <ScrollView
                style={{paddingHorizontal:screenPadding.horizontal}}
                contentInsetAdjustmentBehavior="automatic"
            >
                <PlaylistList 
                    scrollEnabled={false}
                    playlists={filteredPlaylists}
                    onPlaylistPress={handlePlaylistPress}
                />
            </ScrollView>
        </View>
    )
}

export default PlayListScreen;