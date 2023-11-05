import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
	Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SetInput = () => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState([]);

  const handleWeightChange = (text, index) => {
    setSets((prevSets) =>
      prevSets.map((set, i) =>
        i === index ? { ...set, weight: text } : set
      )
    );
  };

  const handleRepsChange = (text, index) => {
    setSets((prevSets) =>
      prevSets.map((set, i) =>
        i === index ? { ...set, reps: text } : set
      )
    );
  };


  const handleAddSet = () => {
    setSets([...sets, { weight: '', reps: '' }]);
  };


  useEffect(() => {
    setSets([...sets, {weight: '', reps: ''}]);
  }, []);
	
  return (
    <View>
      {sets.map((item, index) => (
        <View key={index} style={styles.container}>
          <Text>{index + 1}</Text>
          <TextInput
            style={styles.input}
            placeholder="Weight (lbs)"
            keyboardType="numeric"
            value={item.weight}
            onChangeText={(text) => handleWeightChange(text, index)}
          />
          <TextInput
            style={styles.input}
            placeholder="Reps"
            keyboardType="numeric"
            value={item.reps}
            onChangeText={(text) => handleRepsChange(text, index)}
          />
					<Pressable>
						<Ionicons name='checkmark-sharp' size={20}/>
					</Pressable>
        </View>
      ))}
			<Button title="Add Set" onPress={handleAddSet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 100,
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
});

export default SetInput;
