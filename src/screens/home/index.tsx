import React, { useEffect, useState } from 'react';
import { View, Text, ImageProps, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

type Props = {
    name: string;
    image: ImageProps;
};

const Home: React.FC<Props> = ({ name, image }) => {
    const [page, setPage] = useState<number>(1);

    const {
        Cat: { getAllCat },
    } = useDispatch();

    const allCats = useSelector((state: RootState) => state?.Cat?.cats);

    useEffect(() => {
        getAllCat(page);
    }, [page, getAllCat]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>All Cats</Text>

            <FlatList
                data={allCats}

                renderItem={({ item }) => {
                    console.log(item);
                    return (
                        <View>
                            <Image
                                source={{ uri: item?.url }}
                                resizeMode="contain"
                                style={{ height: 300, width: 300 }}
                            />
                        </View>
                    );
                }}
            />
        </SafeAreaView>
    );
};

export default Home;
