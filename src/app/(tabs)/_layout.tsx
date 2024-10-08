import { OS } from "@/constants/device";
import { colors, fontSize } from "@/constants/tokens";
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

const TabsNavigation = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarLabelStyle: {
                fontSize: fontSize.xs,
                fontWeight: '500'
            },
            tabBarStyle: {
                position: 'absolute',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderTopWidth: 0,
                paddingTop: 8,
            },
            headerShown: false,
            tabBarBackground: () => (
                <BlurView
                    intensity={OS === "android" ? 0 : 95}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        overflow: 'hidden',
                        borderTopLeftRadius: OS === "android" ? 0 : 20,
                        borderTopRightRadius: OS === "android" ? 0 : 20,
                        backgroundColor: OS === "android" ? "#000000" : null
                    }}

                />
            )
        }}
        >
            <Tabs.Screen
                name="favorites"
                options={{
                    title: "Favorites",
                    tabBarIcon: ({ color }) => <FontAwesome name="heart" size={20} color={color} />
                }}
            />
            <Tabs.Screen
                name="playlist"
                options={{
                    title: "Playlists",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="playlist-play" size={20} color={color} />
                }}
            />
            <Tabs.Screen
                name="(songs)"
                options={{
                    title: 'Songs',
                    tabBarIcon: ({ color }) => <Ionicons name="musical-notes-sharp" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="artists"
                options={{
                    title: 'Artist',
                    tabBarIcon: ({ color }) => <FontAwesome6 name="users-line" size={20} color={color} />
                }}
            />
        </Tabs>
    )
}

export default TabsNavigation;