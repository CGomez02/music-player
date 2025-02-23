import { unknownTrackImgeUri } from '@/constants/images';
import { Playlist } from '@/helpers/types';
import { utilsStyles } from '@/styles';
import { FlatList, FlatListProps, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import PlaylistListItem from './PlaylistListItem';

type PlaylistListProps = {
    playlists: Playlist[]
    onPlaylistPress: (playlist: Playlist) => void
} & Partial<FlatListProps<Playlist>>


const ItemDivider = () => <View style={[{...utilsStyles.itemSeparator, marginVertical:12, marginLeft:80}]}/>
const PlaylistList: React.FC<PlaylistListProps> = ({
    playlists,
    onPlaylistPress : handlePlaylistPress,
    ...flatlistPorps
}) => {
    return (
        <FlatList 
            data={playlists}
            contentContainerStyle={{paddingTop:10, paddingBottom:128}}
            ItemSeparatorComponent={ItemDivider}
            ListFooterComponent={playlists.length > 0 ? ItemDivider : undefined}
            ListEmptyComponent={
                <View>
                    <Text style={utilsStyles.emptyContentText}>No playlist found</Text>
                    <FastImage 
                        source={{
                            uri: unknownTrackImgeUri,
                            priority: FastImage.priority.normal,
                        }}
                        style={utilsStyles.emptyContentImage}
                    />
                </View>
            }
            renderItem={({item : playlist})=> (<PlaylistListItem playlist={playlist} onPress={() => handlePlaylistPress(playlist)}/>)}
            {...flatlistPorps}

        />
    );
};

export default PlaylistList;

const styles = StyleSheet.create({

})