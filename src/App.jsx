import { useRef, useState } from "react";
const API_KEY = import.meta.env.VITE_API_KEY;

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
          temperature: 1,
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
