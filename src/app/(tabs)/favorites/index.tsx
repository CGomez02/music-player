import { TrackList } from "@/components/TrackList";
import { OS } from "@/constants/device";
import { screenPadding } from "@/constants/tokens";
import { trackTitleFilter } from "@/helpers/filter";
import { generateTracksListId } from "@/helpers/miscellaneuos";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { useFavorites } from "@/store/library";
import { defaultStyles } from "@/styles";
import { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";


const FavoritesScreen = () => {

    const search = useNavigationSearch({
        title: 'Favorites',
        searchBarOptions:{
            placeholder: 'Find in favorites songs',
            hideWhenScrolling:true
            

        }
    })
    const favoritesTracks = useFavorites().favorites


    const filteredFavorites = useMemo(()=> {
        if(!search) return favoritesTracks
        return favoritesTracks.filter(trackTitleFilter(search))
    },[search, favoritesTracks])


    return (
        <View style={defaultStyles.container}>
            <ScrollView
                style={styles.scroll}
                contentInsetAdjustmentBehavior="automatic"
                indicatorStyle="white"
            >
                <TrackList 
                    id={generateTracksListId('favorites', search)}
                    tracks={filteredFavorites} 
                    scrollEnabled={false} 
                />
            </ScrollView>
        </View>
    )
}

export default FavoritesScreen;

const styles = StyleSheet.create({
    scroll: {
        marginTop: OS === "android" ? 100 : 0,
        paddingHorizontal: screenPadding.horizontal
    }
})