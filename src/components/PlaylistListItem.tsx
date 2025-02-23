import { colors } from '@/constants/tokens';
import { Playlist } from '@/helpers/types';
import { defaultStyles } from '@/styles';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableHighlight, TouchableHighlightProps, View } from 'react-native';
import FastImage from 'react-native-fast-image';

type PlaylistListItemProps = {
    playlist: Playlist
    onPress: () => void
} & TouchableHighlightProps

const PlaylistListItem: React.FC<PlaylistListItemProps> = ({
    playlist,
    ...props
}) => {
    return (
        <TouchableHighlight activeOpacity={0.8} {...props}>
            <View style={styles.playlistItemContainer}>
                <View>
                    <FastImage 
                        source={{
                            uri: playlist.artworkPreview,
                            priority: FastImage.priority.normal
                        }}
                        style={styles.playlistArtWorkImage}
                    />
                </View>
                <View 
                    style={styles.playlistTextContainer}
                >
                    <Text numberOfLines={1} style={styles.playlistNameText}>{playlist.name}</Text>
                    <AntDesign name='right' size={16} color={colors.icon} style={{opacity:0.5}}/>
                </View>
                
            </View>
        </TouchableHighlight>
    );
};

export default PlaylistListItem;

const styles = StyleSheet.create({
    playlistItemContainer:{
        flexDirection:'row',
        columnGap:14,
        alignItems:'center',
        paddingRight:90
    },
    playlistArtWorkImage:{
        borderRadius:8,
        width:70,
        height:70
    },
    playlistTextContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%'
    },
    playlistNameText:{
        ...defaultStyles.text,
        fontSize:17,
        fontWeight:'600',
        maxWidth:'80%'
    },
    
})