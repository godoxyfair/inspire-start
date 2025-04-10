import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config(); // для использования переменных окружения

const prisma = new PrismaClient();
const router = express.Router();

// Настроим passport с Google OAuth
passport.serializeUser((user, done) => {
  done(null, user.id); // Сохраняем только id пользователя
});

passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  done(null, user);
});

// Настройка стратегии Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        if (existingUser) {
          return done(null, existingUser); // Если пользователь уже есть в базе
        }

        // Создаём нового пользователя
        const newUser = await prisma.user.create({
          data: {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          },
        });

        done(null, newUser); // Отправляем нового пользователя в сессию
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Маршрут для авторизации с Google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Маршрут для обработки колбэка после успешного логина с Google
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    // Пользователь авторизован, редирект на фронтенд
    res.redirect("http://localhost:3000"); // Передаём пользователя на фронт
  }
);

// Получение информации о текущем пользователе
router.get("/auth/userInfo", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "User not authenticated" });
  }
});

// router.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return res.status(500).json({ message: "Error logging out" });
//     }
//     res.redirect("http://localhost:3000"); // Перенаправление на фронт после выхода
//   });
// });

router.get("/auth/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }

    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // имя куки по умолчанию
      res.json({ message: "Logged out" });
    });
  });
});

export default router;
