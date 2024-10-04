const TopArtists = ({ artists }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {artists.map((artist, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg">
            <img src={artist.images[0]?.url} alt={artist.name} className="w-full rounded-lg" />
            <h3 className="text-lg font-semibold mt-2">{artist.name}</h3>
          </div>
        ))}
      </div>
    );
  };
  
  export default TopArtists;
  