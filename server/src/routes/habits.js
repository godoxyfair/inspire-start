import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Получить привычки (с пагинацией)
router.get("/", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [habits, total] = await Promise.all([
      prisma.habit.findMany({
        where: { userId: req.user.id }, // Получаем привычки, связанные с пользователем
        skip,
        take: limit,
        orderBy: { id: "desc" },
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
router.post("/", async (req, res) => {
  const { title } = req.body;
  const habit = await prisma.habit.create({
    data: { title, userId: req.user.id },
  });
  res.json(habit);
});

// Удалить привычку
router.delete("/:id", async (req, res) => {
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
router.post("/:id/log", async (req, res) => {
  const { id } = req.params;
  const log = await prisma.habitLog.create({
    data: {
      habitId: parseInt(id),
      date: new Date(),
    },
  });
  res.json(log);
});

export default router;
