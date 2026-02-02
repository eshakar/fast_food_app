import { images } from "@/constants";
import { logout } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import React from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';


interface ProfileItemProps {
    icon: any;
    title: string;
    onPress?: () => void;
    textStyle?: string;
    showArrow?: boolean;
}

const ProfileItem = ({ icon, title, onPress, textStyle, showArrow = true }: ProfileItemProps) => (
    <TouchableOpacity onPress={onPress} className="flex-row items-center justify-between py-4">
        <View className="flex-row items-center gap-3">
            <Image source={icon} className="size-6" resizeMode="contain" />
            <Text className={`body-semibold text-dark-100 ${textStyle}`}>{title}</Text>
        </View>

        {showArrow && (
            <Image source={images.arrowRight} className="size-5" resizeMode="contain" />
        )}
    </TouchableOpacity>
)

const Profile = () => {
    const { user, setUser, setIsAuthenticated } = useAuthStore();


    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            Alert.alert("Error", "Failed to logout");
        }
    }



    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 px-7"
            >
                <View className="flex-row items-center justify-between mt-5">
                    <Text className="h2-bold text-dark-100">Profile</Text>
                    <Image source={images.phone} className="size-6" resizeMode="contain" />
                </View>

                <View className="flex-row justify-center mt-5">
                    <View className="flex-col items-center relative mt-5">
                        <Image
                            source={{ uri: user?.avatar }}
                            className="size-44 relative rounded-full"
                        />
                        <TouchableOpacity className="absolute bottom-11 right-2">
                            <Image source={images.pencil} className="size-9" />
                        </TouchableOpacity>

                        <Text className="h2-bold text-dark-100 mt-2">{user?.name}</Text>
                    </View>
                </View>

                <View className="flex-col mt-10">
                    <ProfileItem icon={images.person} title="My Orders" />
                    <ProfileItem icon={images.location} title="Delivery Address" />
                    <ProfileItem icon={images.dollar} title="Payments" />
                </View>

                <View className="flex-col mt-5 border-t border-primary-200 pt-5">

                    <ProfileItem
                        icon={images.logout}
                        title="Logout"
                        textStyle="text-danger"
                        showArrow={false}
                        onPress={handleLogout}
                    />
                </View>
            </ScrollView>


        </SafeAreaView>
    )
}
export default Profile
