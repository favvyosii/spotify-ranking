const TopGenres = ({ genres }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {genres.map((genre, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mt-2 text-center capitalize">{genre}</h3>
          </div>
        ))}
      </div>
    );
  };
  
  export default TopGenres;
  