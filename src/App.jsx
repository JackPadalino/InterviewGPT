import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const API_KEY = "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";

function App() {
  const [gptMessage, setGptMessage] = useState("");
  const topic = useRef("");
  const expertise = useRef("");

  const handleTopicChange = (event) => {
    topic.current = event.target.value;
  };

  const handleExpertiseChange = (event) => {
    expertise.current = event.target.value;
  };

  const getGptResponse = async () => {
    if (topic.current === "") {
      setGptMessage("Please enter a topic.");
    } else if (expertise.current === "") {
      setGptMessage("Please enter a question level.");
    } else {
      await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Ask me a ${expertise.current} level interview question about ${topic.current}} 
              to help me prepare. Respond only with the question.`,
            },
          ],
          temperature: 1, // Temperature sets how random the response should be. Lower means more predictable. Higher means more random.
        }),
      })
        .then((response) => response.json())
        .then((data) => setGptMessage(data.choices[0].message.content));
    }
  };

  return (
    <div className="App">
      <input placeholder="Subject" onChange={handleTopicChange} />
      <select onChange={handleExpertiseChange}>
        <option value="">-</option>
        <option value="beginner">Beginner</option>
        <option value="middle">Middle</option>
        <option value="expert">Expert</option>
      </select>
      <button onClick={getGptResponse}>Click</button>
      <p>{gptMessage}</p>
    </div>
  );
}

export default App;
