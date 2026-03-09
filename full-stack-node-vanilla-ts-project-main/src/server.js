import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import { aiRouter } from "./routes/aiRoute.js";

const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || "loremipsum";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: "lax",
        },
    }),
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/:page", (req, res) => {
    const page = req.params.page;

    const filePath = path.join(__dirname, "../public", `${page}.html`);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`File not found: ${page}.html`);
            res.status(404).sendFile(
                path.join(__dirname, "../public", "404.html"),
            );
        }
    });
});

app.use("/api/ask", aiRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}).on("error", (err) => {
    console.error("Failed to start server:", err);
});
