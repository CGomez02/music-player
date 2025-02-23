import { TrackList } from "@/components/TrackList";
import { OS } from "@/constants/device";
import { screenPadding } from "@/constants/tokens";
import { trackTitleFilter } from "@/helpers/filter";
import { generateTracksListId } from "@/helpers/miscellaneuos";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { useTracks } from '@/store/library';
import { defaultStyles } from "@/styles";
import { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const SongsScreen = () => {

    const search = useNavigationSearch({
        searchBarOptions:{
            placeholder: 'Find in songs',
        }
    })

    const tracks = useTracks()
    const filteredSongs = useMemo(()=>{
        if(!search) return tracks
        return tracks.filter(trackTitleFilter(search))
    },[search, tracks])



    return (
        <View style={defaultStyles.container}>
            <ScrollView
                style={styles.scroll}
                contentInsetAdjustmentBehavior="automatic"
                indicatorStyle="white"
            >
                <TrackList
                    id={generateTracksListId('songs', search)}
                    scrollEnabled={false} 
                    tracks={filteredSongs} 
                />
            </ScrollView>
        </View>
    )
}

export default SongsScreen;

const styles = StyleSheet.create({
    scroll: {
        marginTop: OS === "android" ? 100 : 0,
        paddingHorizontal: screenPadding.horizontal
    }
})