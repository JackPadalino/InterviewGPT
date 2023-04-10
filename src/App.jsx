import { useRef, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Form from "./components/Form";
import Response from "./components/Response";
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [gptMessage, setGptMessage] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const getGptResponse = async (event) => {
    event.preventDefault();
    if (topic === "") {
      setGptMessage("Please enter a subject.");
    } else if (difficulty === "") {
      setGptMessage("Please select a difficulty level.");
    } else {
      setLoading(true);
      await axios
        .post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `Ask me a ${difficulty} level interview question about ${topic}} to help me prepare for an upcoming interview. Respond only with the question.`,
              },
            ],
            temperature: 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        )
        .then((response) =>
          setGptMessage(response.data.choices[0].message.content)
        );
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-5">
      <Header />
      <Form
        handleTopicChange={handleTopicChange}
        handleDifficultyChange={handleDifficultyChange}
        getGptResponse={getGptResponse}
      />
      <Response loading={loading} gptMessage={gptMessage} />
    </div>
  );
}

export default App;
