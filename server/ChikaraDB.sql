CREATE DATABASE Chikara;

USE Chikara;

CREATE TABLE Users(
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    DateOfBirth DATE NOT NULL,
    Height NUMERIC(5, 2) NOT NULL,
    WEIGHT NUMERIC(5, 2) NOT NULL
);

CREATE TABLE Exercises (
    ExerciseID SERIAL PRIMARY KEY,
    UserID INT,
    ExerciseName VARCHAR(255) NOT NULL,
    Description TEXT,
    Category VARCHAR(50),
    UNIQUE(UserID, ExerciseName), 
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Workouts (
    WorkoutID SERIAL PRIMARY KEY,
    UserID INT,
    PlanName VARCHAR(255) NOT NULL,
    StartTime TIMESTAMP,
    EndTime TIMESTAMP,
    CreationDate TIMESTAMPTZ DEFAULT current_timestamp,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE WorkoutExercises (
    WorkoutExerciseID SERIAL PRIMARY KEY,
    WorkoutID INT,
    ExerciseID INT,
    UserID INT,
    Sets JSONB, 
    FOREIGN KEY (WorkoutID) REFERENCES Workouts(WorkoutID),
    FOREIGN KEY (ExerciseID) REFERENCES Exercises(ExerciseID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);