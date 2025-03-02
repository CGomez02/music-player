import { useEffect, useRef } from 'react'
import TrackPlayer, { Capability, RatingType, RepeatMode } from 'react-native-track-player'

const setupPlayer = async() => {
    await TrackPlayer.setupPlayer({
        maxCacheSize: 1014 * 10, //10MB

    })
    await TrackPlayer.updateOptions({
        ratingType: RatingType.Heart,
        capabilities: [
                Capability.Play, 
                Capability.Pause, 
                Capability.SkipToNext, 
                Capability.SkipToPrevious, 
                Capability.Stop,
                Capability.SeekTo,
            ]
    })
    await TrackPlayer.setVolume(0.05) //No laud
    await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}
export const useSetupTrackPlayer = ({onLoad} : {onLoad ?: () => void}) => {

    const isInitialize = useRef(false)

    useEffect(()=>{
        setupPlayer()
        .then(()=>{
            isInitialize.current = true
            onLoad?.()
        })
        .catch((error)=>{
            isInitialize.current = false
            console.log(error);
        })
    },[onLoad])
}