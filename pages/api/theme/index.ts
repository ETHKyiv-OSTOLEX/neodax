import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    let lightColorsConfig: object | null = null;
    let darkColorsConfig: object | null = null;

    try {
        const lightConfigPath = path.join(process.cwd(), "public", "palette", "light_theme_token.json");
        const darkConfigPath = path.join(process.cwd(), "public", "palette", "dark_theme_token.json");

        if (fs.existsSync(lightConfigPath)) {
            lightColorsConfig = JSON.parse(fs.readFileSync(lightConfigPath, "utf-8"));
        }

        if (fs.existsSync(darkConfigPath)) {
            darkColorsConfig = JSON.parse(fs.readFileSync(darkConfigPath, "utf-8"));
        }
    } catch (error) {
        console.error("Error reading theme config files:", error);
        return res.status(500).json({ error: "Failed to read theme config files" });
    }

    res.status(200).json({ lightColorsConfig, darkColorsConfig });
}
