import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "../context/GlobalContext";

const SearchComponent = () => {
  const { news } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        handleSearch();
      }
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = async () => {
    const filteredResults = news?.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-30 w-[400px]" ref={searchRef}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="bg-gray-50 w-full py-2 pl-4 pr-11 rounded-md focus:outline-none focus:border-gray-300 transition duration-100 ease-in-out border border-gray-200 text-gray-700"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value);
            if (value.trim() === "") {
              setSearchResults([]);
            }
          }}
          onFocus={() => searchTerm && setSearchResults(searchResults)}
        />
        <button type="submit">
          <Search className="absolute top-2 right-3 text-gray-500" />
        </button>
      </form>
      {searchResults?.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full max-h-[400px] overflow-y-auto z-50">
          {searchResults.map((result, index) => (
            <li key={index} className="p-2 hover:bg-gray-100 flex items-center">
              <Link
                href={`/article/${result._id}`}
                className="flex items-center"
                onClick={() => {
                  setSearchTerm("");
                  setSearchResults([]);
                }}
              >
                {result.photosDescription.length > 0 && (
                  <Image
                    src={
                      result.photosDescription.length > 0 &&
                      result.photosDescription.find(
                        (photoObj) => photoObj.photo && photoObj.photo !== ""
                      )?.photo
                    }
                    alt={result.title}
                    width={100}
                    height={50}
                    className="h-full object-center object-cover mr-3"
                  />
                )}
                <span>{result.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;