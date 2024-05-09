import React from 'react';
import { View } from 'react-native';

const Spacer = ({spacerHeight = 20 }) => {
    return (
        <View style={{ height: spacerHeight }}>
        </View>
    );
};

export default Spacer;
