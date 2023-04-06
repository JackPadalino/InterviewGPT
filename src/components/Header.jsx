import React from "react";

const Header = () => {
  return (
    <div>
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
    </div>
  );
};

export default Header;
