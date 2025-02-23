import { Track } from "react-native-track-player"
import { Artist, Playlist } from "./types"

export const trackTitleFilter = (title: string) => (track: Track) =>
    track.title?.toLowerCase().includes(title.toLowerCase())

export const artistNameFilter = (artistName : string ) => (artist : Artist) => 
    artist.name.toLowerCase().includes(artistName.toLowerCase())

export const playlistNameFilter = (playlistName : string) => (playlist : Playlist) =>  
    playlist.name.toLowerCase().includes(playlistName.toLowerCase())