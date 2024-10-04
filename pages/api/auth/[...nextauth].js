import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: "4984de9756824e40977f0a58899a9bb7",
      clientSecret: "a197ef91051348b2a23e460cb0493b9a",
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
