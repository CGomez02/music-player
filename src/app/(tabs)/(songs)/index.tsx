import library from '@/assets/data/library.json';
import { TrackList } from "@/components/TrackList";
import { OS } from "@/constants/device";
import { colors, screenPadding } from "@/constants/tokens";
import { trackTitleFilter } from '@/helpers/filter';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { defaultStyles } from "@/styles";
import { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const SongsScreen = () => {

    const search = useNavigationSearch({
        searchBarOptions: {
            headerIconColor: colors.textMuted,
            textColor: colors.text,
            tintColor: colors.text,
            hintTextColor: colors.textMuted,
        }
    })


    const filteredTracks = useMemo(() => {
        if (!search) return library
        return library.filter(trackTitleFilter(search))
    }, [search])

    return (
        <View style={defaultStyles.container}>
            <ScrollView
                style={styles.scroll}
                contentInsetAdjustmentBehavior="automatic"
                indicatorStyle="white"
            >
                <TrackList scrollEnabled={false} tracks={filteredTracks} />
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