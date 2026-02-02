
import {SplashScreen, Stack} from "expo-router";
import "./globals.css";
import {useEffect} from "react";
import {useFonts} from "expo-font";
import * as Sentry from '@sentry/react-native';
import useAuthStore from "@/store/auth.store";

Sentry.init({
  dsn: 'https://64b250974ada5a9ad448985f9788d126@o4510039516184576.ingest.de.sentry.io/4510793985753168',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
    const {isLoading, fetchAuthenticatedUser} = useAuthStore();
    const [ fontLoaded, error ] = useFonts({
        "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
        "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
        "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
        "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
        "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
        if (fontLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontLoaded, error]);

    useEffect(() => {
        fetchAuthenticatedUser()
    }, []);

    if (!fontLoaded || isLoading) return null;
  return <Stack screenOptions={{ headerShown: false }} />;
});