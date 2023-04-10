import { useRef, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Form from "./components/Form";
import Response from "./components/Response";
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [gptMessage, setGptMessage] = useState("");
  const topic = useRef("");
  const expertise = useRef("");
  const [loading, setLoading] = useState(false);

  const handleTopicChange = (event) => {
    topic.current = event.target.value;
  };

  const handleExpertiseChange = (event) => {
    expertise.current = event.target.value;
  };

  const getGptResponse = async (event) => {
    event.preventDefault();
    if (topic.current === "") {
      setGptMessage("Please enter a subject.");
    } else if (expertise.current === "") {
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
                content: `Ask me a ${expertise.current} level interview question about ${topic.current}} to help me prepare for an upcoming interview. Respond only with the question.`,
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
        handleExpertiseChange={handleExpertiseChange}
        getGptResponse={getGptResponse}
      />
      <Response loading={loading} gptMessage={gptMessage} />
    </div>
  );
}

export default App;
