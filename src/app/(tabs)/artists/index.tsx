import { unknownArtistImgeUri } from "@/constants/images";
import { screenPadding } from "@/constants/tokens";
import { artistNameFilter } from "@/helpers/filter";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { useArtists } from "@/store/library";
import { defaultStyles, utilsStyles } from "@/styles";
import { Link } from "expo-router";
import { useMemo } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import FastImage from "react-native-fast-image";

const ItemSeparator = () => {
    return <View style={[utilsStyles.itemSeparator, {marginLeft:50, marginVertical:12}]}/>
}
const ArtistScreen = () => {


    const search = useNavigationSearch({
        title: 'Artists',
        searchBarOptions:{
            placeholder: 'Search an artist',
            hideWhenScrolling:true

        }
    })
    const artists = useArtists()

    const filteredArtists = useMemo(()=>{
        if(!search) return artists
        return artists.filter(artistNameFilter(search))
    },[search, artists])


    return (
        <View style={defaultStyles.container}>
            <ScrollView 
                style={{paddingHorizontal:screenPadding.horizontal}}
                contentInsetAdjustmentBehavior="automatic"
            >
                <FlatList
                    data={filteredArtists}
                    scrollEnabled={false}
                    ItemSeparatorComponent={ItemSeparator}
                    ListEmptyComponent={
                        <View>
                            <Text style={utilsStyles.emptyContentText}>No artist found</Text>
                            <FastImage 
                                source={{
                                    uri: unknownArtistImgeUri,
                                    priority: FastImage.priority.normal
                                }}
                                style={utilsStyles.emptyContentImage}
                            />
                        </View>
                    }
                    contentContainerStyle={{paddingTop:10, paddingBottom:120}}
                    renderItem={({item: artist})=>{
                        return(
                            <Link href={`/artists/${artist.name}`} asChild>
                                <TouchableHighlight 
                                    activeOpacity={0.8}
                                >
                                    <View style={styles.artistItemContainer}>
                                        <View>
                                            <FastImage 
                                                source={{
                                                    uri: unknownArtistImgeUri,
                                                    priority:FastImage.priority.normal
                                                }}
                                                style={styles.artistImage}
                                            />
                                        </View>
                                        <View style={{width:'100%'}}>
                                            <Text numberOfLines={1} style={styles.artistNameText}>{artist.name}</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            </Link>
                        )
                    }}
                />
            </ScrollView>
        </View>
    )
}

export default ArtistScreen;

const styles = StyleSheet.create({
    artistItemContainer:{
        flexDirection:'row',
        columnGap:14,
        alignItems:'center'
    },
    artistImage:{
        borderRadius:32,
        width:40,
        height:40
    },
    artistNameText:{
        ...defaultStyles.text,
        fontSize:17,
        maxWidth:'80%'
    }
})