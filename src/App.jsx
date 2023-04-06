import { useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [loading, setLoading] = useState(false);
  const [gptMessage, setGptMessage] = useState("");
  const topic = useRef("");
  const expertise = useRef("");

  const handleTopicChange = (event) => {
    topic.current = event.target.value;
  };

  const handleExpertiseChange = (event) => {
    expertise.current = event.target.value;
  };

  const getGptResponse = async (event) => {
    event.preventDefault();
    if (topic.current === "") {
      setGptMessage("Please enter a topic.");
    } else if (expertise.current === "") {
      setGptMessage("Please select a difficulty level.");
    } else {
      setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-5">
      {/* welcome message */}
      <div className="flex items-center justify-center flex-col text-center mt-32 max-sm:mt-10 max-md:mt-10">
        <div className="flex items-center gap-2.5">
          <h1 className="text-4xl md:text-7l m-0 p-0 font-bold">
            InterviewGPT
          </h1>
          <img src="/assets/robot.png" alt="" className="w-12 h-12" />
        </div>
        <p className="text-xl md:text-xlfont-medium mt-2">
          Practice interview questions with an expert AI interviewer!
        </p>
      </div>
      {/* form */}

      <form className="flex min-sm:flex-row max-sm:flex-col gap-1 mx-auto mt-2 h-10">
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Subject"
            className="border-2 border-black rounded-md h-full p-2"
            onChange={handleTopicChange}
          />
          <select
            className="border-2 border-black rounded-md h-full bg-white"
            onChange={handleExpertiseChange}
          >
            <option value="">Difficulty</option>
            <option value="beginner">Mild</option>
            <option value="middle">Medium</option>
            <option value="expert">Spicy</option>
          </select>
        </div>
        <button
          className="border-2 px-3 border-black rounded-md hover:bg-green-700 hover:text-white ht-full max-md:bg-green-700"
          onClick={getGptResponse}
        >
          Get question
        </button>
      </form>

      {/* GPT response */}
      <div className="flex w-1/2 mx-auto max-sm:mt-20 max-md:mt-10 mt-28 justify-center w-full">
        {loading ? (
          <CircularProgress />
        ) : (
          <p className="text-3xl italic text-center">{gptMessage}</p>
        )}
      </div>
    </div>
  );
}

export default App;
