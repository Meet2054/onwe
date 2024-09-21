import React, { useState, FormEvent, useEffect, useCallback } from "react";
import ProfileCard from "./explore/ProfileCard";
import Hashtag from "./search/HashTag";
import debounce from "lodash.debounce";
import axios from "axios";
import { useSignIn } from "@/hooks/useSignIn";
import { Hashtag as HashTagProp } from "@/types/type";
import { Profile } from "@/types/type";

interface SearchCProps {
  setOpenSearch: (value: boolean) => void; // Define prop for closing the search bar
}

const SearchC: React.FC<SearchCProps> = ({ setOpenSearch }) => {
  const [searchHistory, setSearchHistory] = useState<(HashTagProp|Profile)[]>([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const [searchText, setSearchText] = useState("");
  const { getToken } = useSignIn();

  useEffect(() => {
    const storedHistory = localStorage.getItem("onweSearchHistory");
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      setSearchHistory(parsedHistory);
    }
  }, []);

  const fetchData = async (query: string, tab: string) => {
    setLoading(true);
    try {
      let apiUrl = "";
      if (query.startsWith("#")) {
        apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/search/hashtagcount/${query.slice(1)}`; // Remove # before making API call
      } else {
        apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/explore/users/${query}`;
      }

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${ getToken()}`,
        },
      });
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

  const handleClick = (item:string) => {
    let history= localStorage.getItem("onweSearchHistory")
    if(history==undefined || !history){
      localStorage.setItem("onweSearchHistory",JSON.stringify([item]))
    }else{
      history=JSON.parse(history)
      history!.push(item)
      localStorage.setItem("onweSearchHistory",JSON.stringify(history))
    }
    console.log(item);
    setOpenSearch(false); // Close the search bar
  };

  return (
    <div className="bg-white h-full w-full border rounded-md">
      <div className="border w-full h-1/5 flex items-center justify-center">
        <div className="flex flex-col justify-center p-1 h-[90%] w-[90%] space-y-8">
          <h1 className="text-2xl">Search</h1>
          <form className="w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md "
            />
          </form>
        </div>
      </div>
      <div className="w-full h-4/5 border overflow-y-auto">
      {
        searchText=="" && searchHistory && 
        <div className="p-1">
          <h1 className="text-md text-gray-400 ml-3">Recent Searches</h1>
          {/* <div onClick={()=>{
            localStorage.setItem("onweSearchHistory","")
            setSearchHistory([])
          }}>Delete</div> */}
        {searchHistory.map((item: any) =>
          "tag" in item ? (
            <Hashtag key={item.id} hashtag={item} onClick={()=>handleClick(item)} />
          ) : (
            <ProfileCard key={item.id} profile={item} onClick={()=>handleClick(item)} />
          )
        )}
        </div>
      }
        { 
        loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          results.map((item: any) =>
            searchText.startsWith("#") ? (
              <Hashtag key={item.id} hashtag={item} onClick={()=>handleClick(item)} />
            ) : (
              <ProfileCard key={item.id} profile={item} onClick={()=>handleClick(item)} />
            )
          )
        )}
      </div>
    </div>
  );
};

export default SearchC;
