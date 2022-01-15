import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import NetInfo from '@react-native-community/netinfo';

type Props = {
  id: number;
};

const Favorite: React.FC<Props> = () => {
  const [networkStat, setNetworkStat] = useState<boolean | null>();
  useEffect(() => {
    const checkNetworkStat = async () => {
      const res = await NetInfo.fetch();

      setNetworkStat(res?.isConnected);
    };

    checkNetworkStat();
  }, []);

  console.log(networkStat, 'network state');

  return (
    <SafeAreaView>
      <Text>Cats I Like</Text>
      <Text>{networkStat}</Text>
    </SafeAreaView>
  );
};

export default Favorite;
