import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import ExercisesScreen from '../screens/LogInScreen/exercisesScreen';
import CustomButton from './CustomButton';
import SelectExercises from './SelectExercise';

const ExerciseModal = ({closeModal, updateSelectedExercises}) => {
  const [selectedExercises, setSelectedExercises] = useState([]);

  const toggleItemSelection = item => {
    if (selectedExercises.includes(item.value)) {
      setSelectedExercises(
        selectedExercises.filter(selectedItem => selectedItem !== item.value),
      );
    } else {
      setSelectedExercises([...selectedExercises, item.value]);
    }
  };

  const closeAndSendSelectedExercises = () => {
    closeModal();
    updateSelectedExercises(selectedExercises);
  };

  return (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Exercises</Text>
          <CustomButton text="Add Exercises" onPress={closeAndSendSelectedExercises}/>
          <CustomButton text="Close" onPress={closeModal} />
          <SelectExercises
            setSelectedExercises={toggleItemSelection}
						selectedExercises={selectedExercises}
          />
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
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: '90%',
    height: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ExerciseModal;
