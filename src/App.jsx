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

  const getGptResponse = async () => {
    if (topic.current === "") {
      setGptMessage("Please enter a topic.");
    } else if (expertise.current === "") {
      setGptMessage("Please enter a question level.");
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
    <div className="flex flex-col max-sm:px-5">
      <div className="flex items-center justify-center flex-col text-center mt-32">
        <div className="flex items-center gap-2.5">
          <h1 className="text-4xl md:text-7l m-0 p-0 font-bold">
            InterviewGPT
          </h1>
          <img src="/assets/robot.png" alt="" className="w-12 h-12" />
        </div>
        <p className="text-base md:text-xlfont-medium mt-1">
          Practice interview questions with an expert AI interviewer!
        </p>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-center gap-1 h-10 mt-5">
          <input
            type="text"
            placeholder="Subject"
            className="border-2 border-black rounded-md h-full p-2"
            onChange={handleTopicChange}
          />
          <select
            className="border-2 border-black rounded-md h-full"
            onChange={handleExpertiseChange}
          >
            <option value="">Difficulty</option>
            <option value="beginner">Mild</option>
            <option value="middle">Medium</option>
            <option value="expert">Spicy</option>
          </select>
          <button
            className="border-2 px-3 border-black rounded-md h-full hover:bg-green-700 hover:text-white"
            onClick={getGptResponse}
          >
            Get question
          </button>
        </div>
      </div>
      <div className=" flex w-1/2 mx-auto mt-24 justify-center max-sm:w-full">
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
