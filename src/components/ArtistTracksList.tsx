import { unknownArtistImgeUri } from '@/constants/images';
import { fontSize } from '@/constants/tokens';
import { trackTitleFilter } from '@/helpers/filter';
import { generateTracksListId } from '@/helpers/miscellaneuos';
import { Artist } from '@/helpers/types';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { defaultStyles } from '@/styles';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { QueueControls } from './QueueControls';
import { TrackList } from './TrackList';

interface ArtistTracksListProps {
    artist: Artist
}

const ArtistTracksList: React.FC<ArtistTracksListProps> = ({
    artist
}) => {

    const search = useNavigationSearch({
        title:'‎',
        searchBarOptions:{
            placeholder: 'Find in songs',
            hideWhenScrolling: true
        }
    })

    const filteredArtistTracks = useMemo(()=> {
        return artist.tracks.filter(trackTitleFilter(search))
    },[search, artist.tracks])



    return(
        <TrackList 
            id={generateTracksListId(artist.name, search)}
            tracks={filteredArtistTracks}
            scrollEnabled={false}
            hideQueueControls={true}
            ListHeaderComponent={
                <View>
                    <View style={styles.artworkImageContainer}>
                        <FastImage 
                            source={{
                                uri: unknownArtistImgeUri,
                                priority: FastImage.priority.normal
                            }}
                            style={styles.artistImage}
                        />
                    </View>
                    <Text numberOfLines={1} style={styles.artistNameText}>
                        {artist.name}
                    </Text>
                    {
                        search.length === 0 && (
                            <QueueControls tracks={filteredArtistTracks} style={{paddingTop:24, paddingBottom:25}}/>
                        )
                    }
                </View>
            }

        />
    )
};

export default ArtistTracksList;

const styles = StyleSheet.create({
    artistHeaderContainer:{
        flex:1,
        marginBottom:32
    },
    artworkImageContainer:{
        flexDirection:'row',
        justifyContent:'center',
        height:200
    },
    artistImage:{
        width:'60%',
        height:'100%',
        resizeMode:'cover',
        borderRadius:128
    },
    artistNameText:{
        ...defaultStyles.text,
        marginTop:22,
        fontSize:fontSize.lg,
        alignItems:'center',
        textAlign:'center',
        fontWeight:'800'
    }
})