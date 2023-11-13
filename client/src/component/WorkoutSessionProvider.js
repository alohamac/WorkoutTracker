import React, {useState} from 'react';

export const WorkoutSessionContext = React.createContext();

const WorkoutSessionProvider = ({children}) => {
  const [exerciseSets, setExerciseSets] = useState({});

  const updateExerciseSets = (exerciseIndex, sets) => {
    setExerciseSets(prevSets => ({
      ...prevSets,
      [exerciseIndex]: sets,
    }));
  };

  return (
    <WorkoutSessionContext.Provider value={{exerciseSets, updateExerciseSets}}>
      {children}
    </WorkoutSessionContext.Provider>
  );
};

export default WorkoutSessionProvider;
