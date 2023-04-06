import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Response = ({ loading, gptMessage }) => {
  return (
    <div>
      <div className="flex w-1/2 mx-auto max-sm:mt-20 max-md:mt-10 mt-28 justify-center w-full">
        {loading ? (
          <CircularProgress />
        ) : (
          <p className="text-3xl italic text-center">{gptMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Response;
