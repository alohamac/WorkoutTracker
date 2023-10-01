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