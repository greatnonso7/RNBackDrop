import React from 'react';
import { View, Text, ImageProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';

type Props = {
    name: string;
    image: ImageProps;
};

const Home: React.FC<Props> = ({ name, image }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>All Cats</Text>
        </SafeAreaView>
    );
};

export default Home;
