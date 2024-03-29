import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

const FinishWorkoutConfirmation = ({closeModal}) => {
  const onCancelPress = () => {
    closeModal();
  };
  return (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Do you want to complete your workout?
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Pressable style={[styles.button, styles.buttonFinish]}>
              <Text style={styles.textStyle}>Finish</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonCancel]} onPress={()=>{onCancelPress()}}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  buttonFinish: {
    backgroundColor: '#68e897',
    marginRight: 10,
    flex: 1,
  },
  buttonCancel: {
    backgroundColor: '#f75e6d',
    marginLeft: 10,
    flex: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default FinishWorkoutConfirmation;
