import { fetchKeys } from "@/api/key";
import { Colors } from "@/constants/Colors";
import { Key } from "@/types/key";
import { useLocalSearchParams } from "expo-router";
import { Location, Send, Trash } from "iconsax-react-native";
import React, { useEffect, useRef, useState } from "react";
import SignatureScreen, { SignatureViewRef } from "react-native-signature-canvas";
import { Button, Card, H4, ScrollView, Text, View, XStack } from "tamagui";
import * as Locations from 'expo-location';
import { Redirect, useRouter } from "expo-router";
import { useStorage } from '@/hooks/useStorage';

export default function SignScreen() {
  const { url } = useLocalSearchParams();
  const ref = useRef<SignatureViewRef>(null);

  const [key, setKey] = useState<Key | null>(null);
  const [savedSignature, setSavedSignature] = useState<string | null>(null);
  const params = useLocalSearchParams();
  const token = params?.token as string | undefined;
  const router = useRouter();

  const { remove, get, set } = useStorage();  // Menggunakan remove dan get dari useStorage

  const X_PORTIER_AGENT = 'portier/Vision (Windows 11; v5.0.1)';
 

  // Fetch key data
  useEffect(() => {
    const fetchKey = async () => {
      const token2 = await handleAccess();
      if (!token) {
        alert('No token found. Please scan the QR code again.');
        return;
      }

      try {
        const response = await fetch(
          `https://kotg-server-531186732263.asia-southeast2.run.app/api/v1/key-otg/sign/${token}?token=${token}`,
          {
            headers: {
              'X-Portier-Agent': X_PORTIER_AGENT,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log('Key Data:', responseData); // Add logging to inspect the data
          setKey(responseData.data); // Save the key data

          // Check if the key has already been signed
          if (responseData.data?.sign) {
            alert('The key has already been signed.');
            // Navigate back to the scan page
            router.push('/scan'); // Navigate back to the scan page after the alert
          }
        } else {
          const errorText = await response.text();
          console.error('Failed to fetch key:', errorText);
          alert('Failed to load key details. Please try again.');
        }
      } catch (error) {
        console.error('Failed to fetch key:', error);
        alert('An error occurred while fetching key details.');
      }
    };

    fetchKey();
  }, [token, router]); // Adding `router` to the dependency array
  // Geolocation request
  const getGeolocation = async (): Promise<{ latitude: number; longitude: number }> => {
    try {
      const { status } = await Locations.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        throw new Error('Location permission denied');
      }

      const location = await Locations.getCurrentPositionAsync({
        accuracy: Locations.Accuracy.High,
      });
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('Error fetching location:', error);
      alert('Failed to fetch location. Please check your permissions and GPS.');
      throw error;
    }
  };

  // Handle signature submission
  const handleOK = async (signature: string) => {
    if (!signature) {
      console.error("Signature is empty.");
    } else {
      setSavedSignature(signature.replace("data:image/png;base64,", ""));
      console.log("Signature saved:", signature.replace("data:image/png;base64,", ""));
    }
  };

  const handleData = (data: string) => {
    console.log("Received signature data:", data);
  };

  const handleEnd = () => {
    if (ref.current) ref.current.readSignature();
  };

  const handleClear = () => {
    if (ref.current) ref.current.clearSignature();
    setSavedSignature(null);
  };

  // Submit signature with location
  const handleSubmit = async () => {
    const token2 = await handleAccess();
    try {
      // Jika token null, biarkan saja dan lanjutkan proses
      if (!token) {
        alert('No token found. Please scan the QR code again.');
        return;
      }
  
      if (!savedSignature) {
        alert('No signature found. Please sign again.');
        return;
      }
  
      const { latitude, longitude } = await getGeolocation();
  
      // Request ke endpoint pertama (tanpa Authorization header)
      const responseWithoutAuth = await fetch(
        `https://kotg-server-531186732263.asia-southeast2.run.app/api/v1/key-otg/sign/${token}?token=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Portier-Agent': X_PORTIER_AGENT,
          },
          body: JSON.stringify({
            sign: savedSignature,
            location_latitude: latitude,
            location_longitude: longitude,
          }),
        }
      );
  
      if (!responseWithoutAuth.ok) {
        const errorText = await responseWithoutAuth.text();
        console.error('Error without auth:', errorText);
        alert('Failed to sign the request without authorization. Please try again.');
        return;
      }
  
      console.log('Response without Authorization:', await responseWithoutAuth.json());
  
      // Jika token tidak null, buat request tambahan dengan Authorization header
      if (token) {
        const responseWithAuth = await fetch(
          `https://kotg-server-531186732263.asia-southeast2.run.app/api/v1/key-otg/auth/sign/${token}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Portier-Agent': X_PORTIER_AGENT,
              Authorization: `Bearer ${token2}`, // Tambahkan Authorization header
            },
            body: JSON.stringify({
              sign: savedSignature,
              location_latitude: latitude,
              location_longitude: longitude,
              access_token: token2, // Tambahkan access_token ke body jika diperlukan
            }),
          }
        );
        if (responseWithAuth.ok) {
          const responseData = await responseWithAuth.json();
          console.log('Response with Authorization:', responseData);
          alert('Signature successfully submitted with authorization.');
          router.push('/home'); // Navigate back to the scan page
        } else {
          const errorText = await responseWithAuth.text();
          console.error('Error with auth:', errorText);
          console.log('access_token', token2);
          alert('Failed to sign the request with authorization. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during the request process:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  const handleAccess = async () => {
    try {
      console.log("Button ditekan");
  
      // Ambil token dari storage
      const accessToken = await get('auth_access_token');
  
      // Cek apakah token ditemukan
      if (accessToken) {
        console.log("Access Token:", accessToken); // Log token ke console
      } else {
        console.log("Access Token tidak ditemukan.");
      }
  
      // Kembalikan token agar bisa digunakan di luar fungsi
      return accessToken;
    } catch (error) {
      console.error("Error saat mengambil access token:", error);
    }
  };
  
  return (
    <ScrollView>
      <View px="$3.5" py="$2.5" gap="$3.5">
        <H4>Key Detail</H4>
        <Card padded bordered>
          <Text>Name: {key?.holder_name || "Loading..."}</Text>
          <Text>
          Key:{" "}
          {key?.issue?.map((issue, index) => `${issue.number}` + (index < key.issue.length - 1 ? ", " : "")) || "Loading..."}
        </Text>

        </Card>
        {/* <Card padded bordered>
          <View fd="row" ai="center" gap="$2">
            <Location color={Colors.danger} />
            <View>
              <Text fontSize={12} fontWeight={400}>
                {key?.location?.name || "Unknown Location"}
              </Text>
              <Text fontSize={12} fontWeight={400}>
                {key?.location?.address || "Unknown Address"}
              </Text>
            </View>
          </View>
        </Card> */}
  
        {/* Updated Signature Section */}
        <XStack ai="center" jc="space-between">
          <H4>Your Signature</H4>
          <Button
            onPress={handleClear}
            theme="red"
            bordered
            h="$3"
            px="$3"
            icon={<Trash color={Colors.danger} size={16} />}
          >
            Clear
          </Button>
        </XStack>
        <View
          bw="$0.5"
          bc={Colors.grey}
          br="$4"
          w="100%"
          height={300}
          overflow="hidden"
        >
          <SignatureScreen
            showsVerticalScrollIndicator={false}
            key="signature-screen-default"
            ref={ref}
            onEnd={handleEnd}
            onOK={handleOK}
            trimWhitespace={true}
            style={{
              width: "100%",
              height: 200,
            }}
          />
        </View>
  
        {/* Submit Button */}
        <Button
          onPress={handleSubmit}
          theme="blue"
          bordered
          br="$10"
          backgroundColor={Colors.primary}
          color={Colors.white}
          icon={<Send color={Colors.white} />}
        >
          Submit
        </Button>
      </View>
    </ScrollView>
  );
  
}
