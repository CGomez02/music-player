import { fontSize } from '@/constants/tokens';
import { trackTitleFilter } from '@/helpers/filter';
import { generateTracksListId } from '@/helpers/miscellaneuos';
import { Playlist } from '@/helpers/types';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { defaultStyles } from '@/styles';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { QueueControls } from './QueueControls';
import { TrackList } from './TrackList';

interface PlaylistTracksListProps {
    playlist: Playlist
}

const PlaylistTracksList: React.FC<PlaylistTracksListProps> = ({
    playlist
}) => {

    const search = useNavigationSearch({
        title: "‎",
        searchBarOptions:{
            hideWhenScrolling:true,
            placeholder:'Find in playlist'
        }
    })

    const filteredTracks = useMemo(()=> {
        return playlist.tracks.filter(trackTitleFilter(search))
    },[search, playlist])

    return (
        <TrackList 
            id={generateTracksListId(playlist.name, search)}
            tracks={filteredTracks}
            scrollEnabled={false}
            hideQueueControls={true}
            ListHeaderComponentStyle={styles.playlistHeaderContainer}
            ListHeaderComponent={
                <View>
                    <View style={styles.artWorkImageContainer}>
                        <FastImage 
                            source={{
                                uri: playlist.artworkPreview,
                                priority: FastImage.priority.normal
                            }}
                            style={styles.artWorkimage}
                        />
                    </View>
                    <Text numberOfLines={1} style={styles.playlistnameText}>
                        {playlist.name}
                    </Text>
                    {
                        search.length === 0 && <QueueControls tracks={playlist.tracks} style={{paddingTop:24}}/>
                    }
                </View>
            }
        />
    );
};

export default PlaylistTracksList;

const styles = StyleSheet.create({
    playlistHeaderContainer:{
        flex:1,
        marginBottom:32
    },
    artWorkImageContainer:{
        height:300,
        flexDirection:'row',
        justifyContent:'center'
    },
    artWorkimage:{
        width:'85%',
        height:'100%',
        resizeMode:'cover',
        borderRadius:12
    },
    playlistnameText:{
        ...defaultStyles.text,
        marginTop:22,
        textAlign:'center',
        fontSize:fontSize.lg,
        fontWeight:'800'
    }
})