import Image from "next/image";
import { SearchIcon } from "@heroicons/react/solid";
import {
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

import { useRouter } from "next/dist/client/router";

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-4 px-1  md:px-10 ">
      {/* left */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-5 md:h-7 lg:h-10 cursor-pointer my-auto active:scale-90 transition duration-150 "
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {/* middle */}
      <div
        className="flex  items-center md:border-2
       rounded-full p-1 py-2 md:shadow-sm "
      >
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className=" flex-grow  bg-transparent
         outline-none text-xs text-gray-600 plcaholder-gry-400 "
          type="text"
          placeholder={placeholder || "start your search"}
        />
        <SearchIcon
          className="hidden md:inline-flex 
        h-8 bg-red-400 text-white rounded-full
         p-2 cursor-pointer md:mx-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ..."
        />
      </div>
      {/* right */}
      <div
        className="flex items-center space-x-2
       justify-end text-gray-500"
      >
        <p className="hidden md:inline cursor-pointer">become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer animate-spin" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full ">
          <MenuIcon className="h-4" />
          <UserCircleIcon className="h-4" />
        </div>
      </div>
      {searchInput && (
        <div className="flex flex-col transform scale-50 md:scale-75 lg:scale-90 col-span-3 md:mx-auto ">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
            className=""
          />
          <div className=" flex items-center border-b mb-4">
            <h2 className="text-xl  flex-grow font-semibold">
              Number of Guests
            </h2>
            <>
              <UsersIcon className="h-7" />
              <input
                value={noOfGuests}
                onChange={(e) => setNoOfGuests(e.target.value)}
                min={1}
                type="number"
                className="w-14  pl-2 text-2xl outline-none text-red-400"
              />
            </>
          </div>
          <div className="flex space-x-40">
            <button onClick={resetInput} className="flex-grow text-gray-500">
              Cancel
            </button>
            <button onClick={search} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
