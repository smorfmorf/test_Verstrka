const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;


app.use(cors())
app.use(express.json());

app.post("/api/submit", (req, res) => {
  console.log('req: ', req.body);
  const { name, phone, email, } = req.body;

  const entry = `
          ФИО: ${name}
          Телефон: ${phone}
          Email: ${email}
  `;

  fs.appendFile("data.txt", entry, (err) => {
    if (err) {
      console.error("Ошибка при записи:", err);
      return res.status(500).send("Ошибка сервера");
    }
    res.status(200).send("Ок");
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
