import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "@/lib/features/explore/exploreSlice";
import { CircleX } from "lucide-react";
import ProfileCard from "@/components/explore/ProfileCard"; // Ensure this is the correct path
import ClubCard from "@/components/clubs/ClubCard"; // Ensure this is the correct path
import debounce from "lodash.debounce";
import axios from "axios";
import { useSignIn } from "@/hooks/useSignIn";

const SearchComponent = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("users");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { getToken } = useSignIn();

  const handleClose = () => {
    dispatch(setSearch(false));
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const fetchData = async (query: string, tab: string) => {
    setLoading(true);
    try {
      // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${tab}/${query}`);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/explore/${tab}/${query}`,
        {
          headers: {
            Authorization: `Bearer ${ getToken()}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchData = useCallback(
    debounce((query: string, tab: string) => {
      setLoading(true);
      fetchData(query, tab);
    }, 500),
    []
  );

  useEffect(() => {
    if (searchText.trim() !== "") {
      debouncedFetchData(searchText, activeTab);
      setLoading(false);
    } else {
      setResults([]);
    }
  }, [searchText, activeTab, debouncedFetchData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <div
          onClick={handleClose}
          className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700 transition duration-200"
        >
          <CircleX size={24} />
        </div>
      </div>
      <div className="flex border-b border-gray-200">
        <div
          className={`w-1/2 text-center p-2 cursor-pointer ${
            activeTab === "users"
              ? "bg-gray-800 text-white rounded-t-lg"
              : "bg-white text-gray-800 hover:bg-gray-100 transition duration-200 rounded-t-lg"
          }`}
          onClick={() => handleTabClick("users")}
        >
          <h1 className="font-medium">Profiles</h1>
        </div>
        <div
          className={`w-1/2 text-center p-2 cursor-pointer ${
            activeTab === "clubs"
              ? "bg-gray-800 text-white rounded-t-lg"
              : "bg-white text-gray-800 hover:bg-gray-100 transition duration-200 rounded-t-lg"
          }`}
          onClick={() => handleTabClick("clubs")}
        >
          <h1 className="font-medium">Club</h1>
        </div>
      </div>
      <div className="flex flex-col space-y-2 overflow-y-auto max-h-80">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          results.map((item: any) =>
            activeTab === "users" ? (
              <ProfileCard key={item.id} profile={item} />
            ) : (
              <ClubCard key={item.id} club={item} />
            )
          )
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
