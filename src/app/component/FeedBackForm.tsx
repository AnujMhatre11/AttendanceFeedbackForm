import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { supabase } from './supabaseClient'; // Import Supabase client

type FeedbackItem = {
  ID: number;
  Que: string;
  Rating: number;
};

const FeedBackForm: React.FC = () => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([
    { ID: 1, Que: 'Teachers Subject Knowledge', Rating: 0 },
    { ID: 2, Que: 'Communication skills of the teacher', Rating: 0 },
    { ID: 3, Que: 'Ability to bring conceptual clarity and promotion of thinking ability', Rating: 0 },
    { ID: 4, Que: 'Teacher illustrates the concept through examples and applications', Rating: 0 },
    { ID: 5, Que: 'Use of ICT (Information Communication Technology) tools', Rating: 0 },
    { ID: 6, Que: 'Ability to engage students during lectures', Rating: 0 },
    { ID: 7, Que: 'Fairness in internal evaluation', Rating: 0 },
  ]);

  const handleRating = (ID: number, newRating: number): void => {
    const updatedFeedback = feedback.map((feedbackItem) =>
      feedbackItem.ID === ID ? { ...feedbackItem, Rating: newRating } : feedbackItem
    );
    setFeedback(updatedFeedback);
  };

  const renderStars = (item: FeedbackItem) => (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => handleRating(item.ID, star)}>
          <Icon
            name="star"
            size={28}
            color={star <= item.Rating ? '#1e90ff' : '#ccc'}
            style={styles.starIcon}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const handleSubmit = async (): Promise<void> => {
    const allAnswered = feedback.every((item) => item.Rating !== 0);

    if (allAnswered) {
      const feedbackData = {
        prn: 'PRN123459', // Replace with the actual PRN value
        semester: 5, // Replace with the actual semester
        division: 'A', // Replace with the actual division
        branch: 'IT', // Replace with the actual branch
        batch: 'B1', // Replace with the actual batch
        subjectid: 'DLO101', // Replace with the actual subject ID
        q1: feedback[0].Rating,
        q2: feedback[1].Rating,
        q3: feedback[2].Rating,
        q4: feedback[3].Rating,
        q5: feedback[4].Rating,
        q6: feedback[5].Rating,
        q7: feedback[6].Rating,
      };

      console.log('Feedback Data:', feedbackData);

      const { data, error } = await supabase.from('feedbacksystem').insert([feedbackData]);

      if (error) {
        // Log the complete error object to inspect the message, details, and additional properties
        console.error('Supabase Insert Error:', JSON.stringify(error, null, 2));
      } else {
        console.log('Feedback Data Inserted Successfully:', data);
      }
    } else {
      Alert.alert('Please answer all the questions before submitting.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Feedback Form</Text>
      <View style={styles.whiteContainer}>
        <Text style={styles.subHeading}>Faculty Name :</Text>
        <Text style={styles.subHeading}>Subject :</Text>

        <FlatList
          data={feedback}
          keyExtractor={(item) => item.ID.toString()}
          renderItem={({ item }) => (
            <View style={styles.yourAnswers}>
              <Text style={styles.question}>{item.Que}</Text>
              {renderStars(item)}
            </View>
          )}
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedBackForm;

const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
    marginTop: 25,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#1e90ff',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'left',
  },
  yourAnswers: {
    padding: 12,
    marginVertical: 10,
    backgroundColor: '#f0f4f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e3e3e3',
  },
  question: {
    fontSize: 16,
    color: '#444',
    fontWeight: '600',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  starIcon: {
    marginHorizontal: 5,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  submitButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
