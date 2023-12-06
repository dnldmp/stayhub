import { useReservation } from "@/context/ReservationContext";
import { debounce } from "lodash";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

export function SearchBox() {
  const [search, setSearch] = useState("");
  const { filterPlaces } = useReservation();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    filterPlaces(search);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((search: string) => {
        filterPlaces(search);
      }, 500),
    [filterPlaces]
  );

  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  return (
    <div className="flex flex-row rounded-full border-gray-300 border w-full max-w-sm md:max-w-md p-2 justify-between pl-4 text-sm">
      <input
        type="text"
        placeholder="Search destinations"
        className="w-full"
        value={search}
        onChange={(event) => handleInputChange(event)}
      />
      <button
        className="rounded-full bg-teal-500 py-2 px-5 text-white hidden md:inline-block ml-1"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
