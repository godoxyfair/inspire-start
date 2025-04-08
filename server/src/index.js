import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3001;
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/habits", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // текущая страница
  const limit = parseInt(req.query.limit) || 10; // сколько привычек на страницу
  const skip = (page - 1) * limit;
  // const habits = await prisma.habit.findMany({
  //   include: { logs: true },
  // });
  // res.json(habits);
  try {
    const [habits, total] = await Promise.all([
      prisma.habit.findMany({
        skip,
        take: limit,
        orderBy: { id: "desc" }, // по желанию
        include: { logs: true },
      }),
      prisma.habit.count(),
    ]);

    res.json({
      data: habits,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении привычек" });
  }
});

// Создать привычку
app.post("/habits", async (req, res) => {
  const { title } = req.body;
  const habit = await prisma.habit.create({ data: { title } });
  res.json(habit);
});

// Удалить привычку
app.delete("/habits/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const habit = await prisma.habit.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: "Habit not found or has related logs." });
  }
});

// Отметить привычку за день
app.post("/habits/:id/log", async (req, res) => {
  const { id } = req.params;
  const log = await prisma.habitLog.create({
    data: {
      habitId: parseInt(id),
      date: new Date(),
    },
  });
  res.json(log);
});

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
