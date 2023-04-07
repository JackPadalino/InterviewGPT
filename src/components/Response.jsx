import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Response = ({ loading, gptMessage }) => {
  return (
    <div className="flex w-1/2 mx-auto mb-10 justify-center w-full mt-24 max-sm:mt-10 max-md:mt-5">
      {loading ? (
        <CircularProgress />
      ) : (
        <p className="text-3xl italic text-center">{gptMessage}</p>
      )}
    </div>
  );
};

export default Response;
