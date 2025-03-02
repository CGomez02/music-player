import PlaylistList from '@/components/PlaylistList'
import { screenPadding } from '@/constants/tokens'
import { Playlist } from '@/helpers/types'
import { usePlaylists, useTracks } from '@/store/library'
import { useQueue } from '@/store/queue'
import { defaultStyles } from '@/styles'
import { useHeaderHeight } from '@react-navigation/elements'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TrackPlayer, { Track } from 'react-native-track-player'

export default function AddToPlaylist() {

    const headerHeight = useHeaderHeight()
    const { trackUrl } = useLocalSearchParams<{trackUrl: Track['url']}>()
    const tracks = useTracks()
    const { activeQueueId } = useQueue()
    const { playlists, addToPlaylist } = usePlaylists()
    const { dismiss } = useRouter()

    const track = tracks.find((currentTrack) => currentTrack.url === trackUrl)

    if(!track) return null

    const availablePlaylist = playlists.filter(
        (playlist) => !playlist.tracks.some((playlistTrack) => playlistTrack.url === trackUrl)
    )

    const handlePlaylistPress = async (playlist: Playlist) => {
        addToPlaylist(track, playlist.name)
        dismiss()

        if(activeQueueId?.startsWith(playlist.name)){
            await TrackPlayer.add(track)
        }
    }

    return (
        <SafeAreaView style={[styles.modalContainer,  {paddingTop: 0}]}>
            <PlaylistList 
                playlists={availablePlaylist}
                onPlaylistPress={handlePlaylistPress}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    modalContainer:{
        ...defaultStyles.container,
        paddingHorizontal:screenPadding.horizontal
    }
})