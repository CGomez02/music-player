import { useFavorites } from '@/store/library';
import { useQueue } from '@/store/queue';
import { MenuView } from '@react-native-menu/menu';
import { useRouter } from 'expo-router';
import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import TrackPlayer, { Track } from 'react-native-track-player';
import { match } from 'ts-pattern';

type TracksShurtcutsMenuProps = PropsWithChildren<{track: Track}>

const TracksShurtcutsMenu: React.FC<TracksShurtcutsMenuProps> = ({track, children}) => {


    const { push } = useRouter()
    const isFavorite = track.rating === 1
    const { toggleTrackFavorite } = useFavorites()
    const { activeQueueId } = useQueue()

    const handlePressOption = (id: string) => {
        match(id)
        .with('add-to-favorites', async () => {
            toggleTrackFavorite(track)

            //If favorites is playing we add the added song to the queue
            if(activeQueueId?.startsWith('favorites')){
                await TrackPlayer.add(track)
            }
        })
        .with('remove-from-favorites', async () => {
            toggleTrackFavorite(track)

            //If favorites is playing we remove the song from the queue
            if(activeQueueId?.startsWith('favorites')){
                const queue = await TrackPlayer.getQueue()
                const trackToRemove = queue.findIndex(queueTrack => queueTrack.url === track.url)
                await TrackPlayer.remove(trackToRemove)
            }
        })
        .with('add-to-playlist', () => {
            push({
                pathname:'/(modals)/addToPlaylist',
                params: {
                    trackUrl: track.url
                }
            })
        })
        .otherwise(()=> {
            console.warn(`Unknown menu action ${id}`)
        })
    }
    return (
        <MenuView
            onPressAction={ ({nativeEvent: {event}}) => handlePressOption(event)}
            actions={[
                {
                    id: isFavorite ? 'remove-from-favorites' : 'add-to-favorites',
                    title: isFavorite ? 'Remove from favorites' : 'Add to playlist',
                    image: isFavorite ? 'star.fill' : 'star',

                },
                {
                    id: 'add-to-playlist',
                    title: 'Add to playlist',
                    image:'plus'
                }
            ]}
        >
            {children}
        </MenuView>
    );
};

export default TracksShurtcutsMenu;

const styles = StyleSheet.create({
    
})