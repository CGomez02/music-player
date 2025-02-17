import { colors } from "@/constants/tokens"
import { useEffect, useState } from "react"
import { getColors } from "react-native-image-colors"
import { IOSImageColors } from "react-native-image-colors/build/types"

export const usePlayerBackground = (  imageURL : string ) => {
    const [ imageColors, setImageColors ] = useState<IOSImageColors | null>(null)

    useEffect(()=>{
        getColors(imageURL,{
            fallback:colors.background,
            cache: true,
            key: imageURL
        }).then((colors)=>{
            setImageColors(colors as IOSImageColors)
        })
    },[imageURL])

    return imageColors
    
}