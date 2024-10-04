import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: "https://accounts.spotify.com/authorize?scope=user-top-read"
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Store the access token in the token object
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass the access token to the session object
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
