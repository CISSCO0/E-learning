import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import { Question } from '../types/questions';
import '../../../../../public/question.css';

interface QuestionItemProps {
  question: Question; // The question object passed as a prop
  onDelete: (id: string) => void;
}

export default function QuestionItem({ question, onDelete  }: QuestionItemProps) {
  const [questionDetails, setQuestionDetails] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionById = async () => {
      try {
        // Assuming the API endpoint for fetching a question by ID looks like this:
        const response = await axios.get(`http://localhost:5000/questions/${question}`,{withCredentials: true});
       // alert("question "+ JSON.stringify(response.data));
        if (response.data) {
          setQuestionDetails(response.data); // Store the fetched question details
        }
      } catch (error) {
        alert('Error fetching question:'+ error);
      } finally {
        setLoading(false);
      }
    };
    
    // If there's a valid question ID, fetch the question details
    if (question) {
      fetchQuestionById();
    }
  }, [question]); // Re-run when the question ID changes
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/questions/${question}`, {
        withCredentials: true,
      });
      alert('Question deleted successfully');
      onDelete(question.toString()); // Notify parent component to remove the question
    } catch (error) {
      alert('Error deleting question: ' + error);
    }
  };
  if (loading) {
    return <p>Loading question details...</p>;
  }

  if (!questionDetails) {
    return <p>Question not found.</p>;
  }

  return (
    <div className="question-item">
      <h3>{questionDetails.content}</h3>
      <p>Type: {questionDetails.type}</p>
      <p>Level: {questionDetails.level.charAt(0).toUpperCase() + questionDetails.level.slice(1)}</p>
      <p>Correct Answer: {questionDetails.correctAnswer}</p>
      {questionDetails.type === 'mcq' && questionDetails.possibleAnswers && (
        <div>
          <p>Possible Answers:</p>
          <ul>
            {questionDetails.possibleAnswers.map((answer, index) => (
              <li key={index} style={{color: answer === questionDetails.correctAnswer ? 'green' : 'inherit'}}>
                {answer}
              </li>
            ))}
          </ul>
        </div>
      )}
      {questionDetails.type === 'true-false' && (
        <p>Possible Answers: True, False</p>
      )}
      <button className="delete" onClick={handleDelete}>Delete</button>
    </div>
  );
}