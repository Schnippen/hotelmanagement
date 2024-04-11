import {Skeleton} from '@rneui/base';
import React from 'react';
import {View, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SkeletonTaskComponent = () => {
  const windowWidth = Dimensions.get('window').width;

  return (
    <View style={{marginVertical: 10, marginHorizontal: 10}}>
      <Skeleton
        LinearGradientComponent={LinearGradient}
        animation="wave"
        width={windowWidth - 20}
        height={200}
        style={{borderRadius: 10}}
      />
    </View>
  );
};

export default SkeletonTaskComponent;
