import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import habitsRouter from "./routes/habits.js";
import authRouter from "./auth.js";
import { ensureAuth } from "./authMiddleware.js";
import cookieParser from "cookie-parser";
import passport from "passport";

dotenv.config();

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret", // ключ для подписи сессий
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // true, если https
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // Применяем middleware ensureAuth ко всем маршрутам
  // кроме тех, которые явно исключаем (например, маршруты для аутентификации)
  if (
    req.path === "/auth/google" ||
    req.path === "/auth/google/callback" ||
    req.path === "/login" // добавь другие маршруты, которые не требуют авторизации
  ) {
    return next();
  }

  // Включаем проверку авторизации для всех остальных маршрутов
  ensureAuth(req, res, next);
});

app.use("/habits", habitsRouter);
app.use(authRouter);
// app.post('/signin', async (req, res) => {
//     const { username, password } = req.body;

//     const user = users.find((u) => u.username === username && u.password === password);

//     if (user) {
//         res.status(200).json({ message: 'Succsess!', username: user.username });
//     } else {
//         res.status(401).json({ message: 'Fail auth' });
//     }

//     // const user = users.find((u) => u.username === username);
//     // if (!user) {
//     //     return res.status(401).json({ message: 'Неверное имя пользователя или пароль.' });
//     // }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//         return res.status(401).json({ message: 'Неверное имя пользователя или пароль.' });
//     }

//     const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
//     res.json({ message: 'Succsess!', username: user.username, token });
// });

// protectedRouter.get('/info', (req, res) => {
//     // res.send(require('./data.json'));
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
