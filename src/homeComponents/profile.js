import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../actions/authentication';

const Profile = () => {
    const [imageUri, setImageUri] = useState(null);

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
            console.log('Response = ', response);
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

    return (
        <View style={styles.container}>
            <Text>User Profile</Text>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            <Button title="Upload New Photo" onPress={handlePickImage} />
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