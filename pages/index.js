import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error('Please sign in to see your rankings.');
    }
  }, [status]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      {!session ? (
        <button
          onClick={() => signIn('spotify')}
          className="bg-green-500 px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg rounded-lg font-semibold transition-colors hover:bg-green-600"
        >
          Sign in with Spotify
        </button>
      ) : (
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Welcome, {session.user.name}!</h1>
          <img 
            src={session.user.image} 
            alt="Profile" 
            className="rounded-full w-24 h-24 sm:w-32 sm:h-32 mt-4 mx-auto"
          />
          <div className="mt-6 space-y-4">
            <button
              onClick={() => signOut()}
              className="w-full sm:w-auto bg-red-500 px-4 py-2 text-sm sm:text-base rounded-lg transition-colors hover:bg-red-600"
            >
              Sign out
            </button>
            <Link href="/profile" className="block">
              <button 
                type="button" 
                className="w-full sm:w-auto text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm sm:text-base px-4 py-2 sm:px-5 sm:py-2.5 transition-colors"
              >
                Check Spotify Stats
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}