import React from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

const OrderPopup = ({ visible, onClose, selectedOrder }) => {
  const copyToClipboard = (id) => {
    Clipboard.setStringAsync(id);
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: (id.includes('order_') ?  `Order ID has been copied to clipboard!`  :  `Payment ID has been copied to clipboard!`),
      visibilityTime: 1500,
      bottomOffset: 100,
    });
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Icon name="info-circle" size={30} color="#000" style={styles.icon} />
          <Text style={styles.modalTitle}>Order Total : ₹ {selectedOrder.amount}</Text>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Your order is <Text style={styles.boldText}>{selectedOrder.status}!</Text></Text>
            <Text style={styles.modalText}>Placed on: <Text style={styles.boldText}>{selectedOrder.order_timestamp}</Text></Text>
            <View style={{flexDirection: 'row', justifyContent:  'space-between'}}>
              <Text style={styles.modalText}>Order ID: <Text style={styles.boldText}>{selectedOrder.razorpay_order_id}</Text></Text>
              <TouchableOpacity onPress={()=>copyToClipboard(selectedOrder.razorpay_order_id)}>
                <Icon name="copy" size={20}/>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent:  'space-between'}}>
              <Text style={styles.modalText}>Payment ID: <Text style={styles.boldText}>{selectedOrder.razorpay_payment_id}</Text></Text>
              <TouchableOpacity onPress={()=>copyToClipboard(selectedOrder.razorpay_payment_id)}>
                <Icon name="copy" size={20}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Back" onPress={onClose} color="#841584" />
          </View>
        </View>
      </View>
      <Toast
        ref={(ref) => Toast.setRef(ref)} 
        style={{ zIndex: 999 }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 15,
  },
  modalContent: {
    width: '100%',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
});

export default OrderPopup;
