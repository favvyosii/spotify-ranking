import Link from 'next/link';

export default function TopTracks({ tracks }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tracks.map((track) => (
        <div key={track.id} className="flex items-center space-x-4">
          <Link href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
            <img 
              src={track.album.images[0].url} 
              alt={track.name} 
              className="w-16 h-16 rounded-lg cursor-pointer" 
            />
          </Link>
          <div>
            <Link href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <h3 className="text-lg font-semibold cursor-pointer">{track.name}</h3>
            </Link>
            <p className="text-sm text-gray-400">
              {track.artists.map((artist) => artist.name).join(', ')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
