import React from 'react';
import { View } from 'react-native';

const Spacer = (props) => {
    const { spacerHeight } = props;
    return (
        <View style={{ height: spacerHeight }}>
        </View>
    );
};

Spacer.defaultProps = {
    spacerHeight: 20
  };

export default Spacer;
