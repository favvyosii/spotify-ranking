import '../styles/globals.css';  // Import global styles (Tailwind CSS)
import { SessionProvider } from "next-auth/react";  // NextAuth for handling session
import { Toaster } from 'react-hot-toast';  // React Hot Toast for notifications

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Toaster position="top-right" reverseOrder={false} />
    </SessionProvider>
  );
}

export default MyApp;
