import NextAuth, {CredentialsSignin} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyUser } from "./lib/actions/user.action";


class InvalidLoginError extends CredentialsSignin {
    code=String;
    constructor(code = "Invalid identifier or password") {
        super(code);
        this.code = code;
        Object.setPrototypeOf(this, InvalidLoginError.prototype);
      }
}

export const {
    handlers,
    signIn,
    signOut,
    auth,
} = NextAuth({
    providers: [
        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const user = await verifyUser(
                        credentials.email,
                        credentials.password
                    );
                    if (!user.success) {
                        throw new Error(user.message || "Invalid credentials");
                    }

                    if (user.accountStatus !== "active") {
                        throw new Error(user.accountStatus || "Account is not active");
                    }

                    return {
                        id: user._id,
                        name: user.name,
                        credits: user.credits,
                        referralCount: user.referralCount,
                        invitationCode: user.invitationCode,
                        accountStatus: user.accountStatus,
                        email: user.email,
                        username: user.username,
                        role: user.role,
                    };
                } catch (error) {
                    throw new InvalidLoginError(error.message || "Invalid credentials");
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/en/auth",
        error: "/en/auth?tab-login",
    },
    secret: process.env.AUTH_SECRET,
});
