const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Ensure you have a User model
require('dotenv').config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback', // Must match Google Cloud Console
            passReqToCallback: true
        },
        async (request, accessToken, refreshToken, profile, done) => {
            try {
                console.log('Google Profile:', profile); // Debugging
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value
                    });
                }

                return done(null, user);
            } catch (err) {
                console.error('❌ Error during authentication:', err);
                return done(err, null);
            }
        }
    )
);

// Serialize user (store user ID in session)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user (fetch user from DB using stored ID)
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
