import library from '@/assets/data/library.json';
import { unknownTrackImgeUri } from '@/constants/images';
import { Artist, Playlist, TrackWithPlaylits } from "@/helpers/types";
import { Track } from "react-native-track-player";
import { create } from "zustand";

interface LibraryState {
    tracks: TrackWithPlaylits[]
    toggleTrackFavorite: (track: Track) => void
    addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
    tracks: library,
    toggleTrackFavorite:()=> {},
    addToPlaylist:(track, playlistName) => {}
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavorites = () => {
    
    const favorites = (useTracks().filter(track => track.rating === 1))
    const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)

    return {
        favorites, 
        toggleTrackFavorite
    }
}

export const useArtists = () => 
    useTracks().reduce((acc, track) => {
        const existingArtist = acc.find((artist) => artist.name === track.artist)
        if(existingArtist){
            existingArtist.tracks.push(track)
        }else{
            acc.push({
                name: track.artist ?? 'Unknown',
                tracks: [track]
            })
        }
        return acc
    }, [] as Artist[])

export const usePlaylists = () => {

    const playlists = useTracks().reduce((acc, track) => {
        track.playlist?.forEach((playlistName) => {
            const existingPlaylist = acc.find((playlist) => playlist.name === playlistName)
            if(existingPlaylist){
                existingPlaylist.tracks.push(track)
            }else{
                acc.push({
                    name: playlistName,
                    tracks:[track],
                    artworkPreview: track.artwork ?? unknownTrackImgeUri
                })
            }
        })
        return acc
    }, [] as Playlist[])

    const addToPlaylist = useLibraryStore(state => state.addToPlaylist)

    return {
        playlists,
        addToPlaylist

    }
}