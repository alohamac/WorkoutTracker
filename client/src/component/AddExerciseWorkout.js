import React, {useState} from 'react';
import {View, Text, TextInput, Modal, StyleSheet} from 'react-native';
import CustomButton from './CustomButton';
import SelectExercises from './SelectExercise';

const ExerciseModal = ({closeModal, updateSelectedExercises}) => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  
  /* Function used to toggle an item selection */
  const toggleItemSelection = item => {
    if (selectedExercises.includes(item)) {
      setSelectedExercises(
        selectedExercises.filter(selectedItem => selectedItem !== item),
      );
    } else {
      setSelectedExercises([...selectedExercises, item]);
    }
  };

  /* Function used to close the exercise selection modal and send the selected exercises to the main workout screen to render */
  const closeAndSendSelectedExercises = () => {
    closeModal();
    const newExercises = selectedExercises.map(obj => ({...obj, sets: [{id: Date.now(), reps: '', weight: ''}]}))
    updateSelectedExercises(newExercises);
  };
  
  return (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Exercises</Text>
          <CustomButton
            text="Add Exercises"
            onPress={closeAndSendSelectedExercises}
          />
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
