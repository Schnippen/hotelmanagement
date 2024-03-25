import {Button, Card, Image, Skeleton, Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function SkeletonRoomComponent() {
  return (
    <Card>
      <Card.Title style={{width: '100%'}}>
        {' '}
        <Skeleton animation="wave" width={200} height={10} />
      </Card.Title>
      <Card.Divider />
      <Skeleton
        LinearGradientComponent={LinearGradient}
        animation="wave"
        height={150}
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 8,
        }}>
        <Text h3>
          <Skeleton animation="wave" width={100} height={40} />
        </Text>
      </View>
      <Button
        disabled={true}
        disabledStyle={{borderColor: 'gray'}}
        disabledTitleStyle={{color: 'gray'}}
        title="Choose"
        type="outline"
        onPress={() => {
          console.log('choose');
        }}
      />
    </Card>
  );
}

export default SkeletonRoomComponent;
