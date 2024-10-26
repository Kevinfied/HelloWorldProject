from math import *

def pointsGained(userWeight, userHeight, userAge, userGender, muscleGroupLevel, reps, weightUsed):
    return calculateBMI(userWeight, userHeight) * calculateGenderConstant(userGender, userAge) * calculateLevelConstant(muscleGroupLevel) * calculateRepsValue(reps) * calculateExerciseConstant(weightUsed, calculateRepsValue(reps))

def calculateBMI(userWeight, userHeight):
    return userWeight / (userHeight * userHeight)

def calculateGenderConstant(userGender, userAge):
    if userGender == "F":
        return (2000/((-0.0289(userAge**2)+1.8165(userAge)+29.1455)**(100/47)))+1
    elif userGender == "M":
        return (2000/((-0.0497(userAge**2)+3.1418(userAge)+46.0182)**(100/47)))+1

def calculateLevelConstant(muscleGroupLevel):
    return (99/100)**(muscleGroupLevel)

def calculateRepsValue(reps):
    return ((10**((reps/12)*(1/2)))/10) - ((10**(1/24))/10) + 1

def calculateExerciseConstant(weightUsed,workoutConstant):
    return (weightUsed)*(workoutConstant)
