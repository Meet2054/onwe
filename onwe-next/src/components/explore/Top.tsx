import React from "react";
import { Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { setSearch } from "@/lib/features/explore/exploreSlice";
import { log } from "console";

const Top = () => {
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.explore.search);

  const toggleSearch = () => {
    dispatch(setSearch(!search));
  };

  return (
    <div className="w-full justify-center items-center mb-2">
      <div className="w-[100%] sm:w-[80%] h-[90%] ml-4 sm:ml-10 space-y-4">
        <h1 className="text-xl mt-6">Search</h1>
        <div
          onClick={toggleSearch}
          className="sm:w-[40%] w-[90%]  h-12 text-gray-400 border-2 mt-1 rounded-xl flex items-center"
        >
          <Search className="ml-2 mr-3" /> Search
        </div>
      </div>
    </div>
  );
};

export default Top;
