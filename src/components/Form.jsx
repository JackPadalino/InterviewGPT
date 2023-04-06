import React from "react";

const Form = ({ handleTopicChange, handleExpertiseChange, getGptResponse }) => {
  return (
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
  );
};

export default Form;
