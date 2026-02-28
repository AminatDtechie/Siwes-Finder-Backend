import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "../db";
import { studentsTable, recruitersTable } from "../db/schema";
import { eq } from "drizzle-orm";

passport.use(
  "google-student",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        const google_id = profile.id;
        const firstname = profile.name?.givenName || "";
        const lastname = profile.name?.familyName || "";

        if (!email) return done(new Error("No email from Google"), undefined);

        // check if student exists by google_id
        let user = await db
          .select()
          .from(studentsTable)
          .where(eq(studentsTable.google_id, google_id))
          .then((r) => r[0]);

        // check by email if not found by google_id
        if (!user) {
          user = await db
            .select()
            .from(studentsTable)
            .where(eq(studentsTable.email, email))
            .then((r) => r[0]);

          if (user) {
            // existing email user — link google_id
            await db
              .update(studentsTable)
              .set({ google_id, auth_provider: "google" })
              .where(eq(studentsTable.email, email));
          } else {
            // brand new user — create
            const newUser = await db
              .insert(studentsTable)
              .values({
                firstname,
                lastname,
                email,
                google_id,
                auth_provider: "google",
                status: "Active",
              })
              .returning();
            user = newUser[0];
          }
        }

        return done(null, { ...user, role: "student" });
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

passport.use(
  "google-recruiter",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        const google_id = profile.id;
        const firstname = profile.name?.givenName || "";
        const lastname = profile.name?.familyName || "";

        if (!email) return done(new Error("No email from Google"), undefined);

        let user = await db
          .select()
          .from(recruitersTable)
          .where(eq(recruitersTable.google_id, google_id))
          .then((r) => r[0]);

        if (!user) {
          user = await db
            .select()
            .from(recruitersTable)
            .where(eq(recruitersTable.email, email))
            .then((r) => r[0]);

          if (user) {
            await db
              .update(recruitersTable)
              .set({ google_id, auth_provider: "google" })
              .where(eq(recruitersTable.email, email));
          } else {
            const newUser = await db
              .insert(recruitersTable)
              .values({
                firstname,
                lastname,
                email,
                google_id,
                auth_provider: "google",
                status: "Active",
              })
              .returning();
            user = newUser[0];
          }
        }

        return done(null, { ...user, role: "recruiter" });
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

export default passport;