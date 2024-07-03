import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getUserById, updateUser } from '../actions/authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ onLogout }) => {
    const [userId, setUserId] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                console.log("get id", storedUserId);
                setUserId(storedUserId);
            } catch (error) {
                console.error("Failed to fetch userId from AsyncStorage", error);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            console.log("fetch data", userId);
            dispatch(getUserById(userId));
        }
    }, [dispatch, userId]);
        
    const user = useSelector(state => state.users.data);
    //const userId = useSelector(state => state.authentication.userId);
    console.log("Profile", userId, user);
    

    const handlePickImage = async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            maxWidth: 200,
            maxHeight: 200,
            includeBase64: false,
            saveToPhotos: true,
        };
        
        launchImageLibrary(options, (response) => {
            //console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.assets[0].uri };
                setImageUri(source.uri);
            }
        });
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <View style={styles.container}>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            <Button title="Upload New Photo" onPress={handlePickImage} />
            {user && <Text>Welcome, {user?.username}</Text>}
            <Button title="Logout" onPress={onLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
});

export default Profile;