import { useSession } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import TopTracks from '../components/TopTracks';
import TopArtists from '../components/TopArtists';
import TopGenres from '../components/TopGenres';
import TopTrackImage from '../components/TopTrackImage';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';  // Import html2canvas for capturing the image
import Link from 'next/link';

export default function Profile() {
  const { data: session } = useSession();
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topGenres, setTopGenres] = useState([]);
  const [topTrack, setTopTrack] = useState(null);
  const tracksRef = useRef(null); // Reference to the tracks list for capturing

  useEffect(() => {
    if (session?.accessToken) {
      fetchTopData();
    } else {
      toast.error('Please sign in to see your profile.');
    }
  }, [session]);

  const fetchTopData = async () => {
    try {
      const resTracks = await fetch('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      });
      const resArtists = await fetch('https://api.spotify.com/v1/me/top/artists', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      });

      const tracksData = await resTracks.json();
      const artistsData = await resArtists.json();

      setTopTracks(tracksData.items);
      setTopArtists(artistsData.items);
      setTopTrack(tracksData.items[0]);  // Set the first track as the top track

      const genres = [...new Set(artistsData.items.flatMap(artist => artist.genres))];
      setTopGenres(genres);

    } catch (error) {
      toast.error('Failed to load your top data.');
      console.error(error);
    }
  };

  const handleDownloadTracksImage = async () => {
    const canvas = await html2canvas(tracksRef.current);  // Capture the tracks list
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'most-streamed-songs.png';  // Download as PNG image
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Your Spotify Profile</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Top Track</h2>
        {topTrack && <TopTrackImage track={topTrack} />}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Top Tracks</h2>
        {/* Wrap the TopTracks component with a ref for capturing */}
        <div ref={tracksRef}>
          <TopTracks tracks={topTracks} />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Top Artists</h2>
        <TopArtists artists={topArtists} />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Top Genres</h2>
        <TopGenres genres={topGenres} />
      </div>

      {/* Button to download the list of most-streamed songs as an image */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleDownloadTracksImage}
          className="bg-green-500 px-6 py-3 text-lg rounded-lg font-semibold">
          Download 
        </button>
      </div>
      <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        <Link href="/">
        Go Home
        </Link>
      </button>
    </div>
  );
}
