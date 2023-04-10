import React from "react";

const Form = ({
  handleTopicChange,
  handleDifficultyChange,
  getGptResponse,
}) => {
  return (
    <div className="flex max-sm:flex-col gap-1 mt-2 mx-auto">
      <div className="flex gap-1">
        <input
          type="text"
          placeholder="Subject"
          className="border-2 border-black rounded-md h-10 p-2"
          onChange={handleTopicChange}
        />
        <select
          className="border-2 border-black rounded-md h-10 bg-white"
          onChange={handleDifficultyChange}
        >
          <option value="">Difficulty</option>
          <option value="beginner">Mild</option>
          <option value="middle">Medium</option>
          <option value="expert">Spicy</option>
        </select>
      </div>
      <button
        className="border-2 px-3 border-black rounded-md hover:bg-green-700 hover:text-white h-10 max-md:bg-green-700"
        onClick={getGptResponse}
      >
        Get question
      </button>
    </div>
  );
};

export default Form;
