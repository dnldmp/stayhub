export function SearchBox() {
  return (
    <div className="flex flex-row rounded-full border-gray-400 border w-full max-w-sm md:max-w-md p-2 justify-between pl-4 text-sm">
      <input type="text" placeholder="Search destinations" className="w-full" />
      <button className="rounded-full bg-teal-500 py-2 px-5 text-white hidden md:inline-block ml-1">
        Search
      </button>
    </div>
  );
}
