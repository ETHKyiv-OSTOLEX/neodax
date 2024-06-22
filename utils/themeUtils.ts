import path from "path";
import fs from "fs";

export interface ThemeColorInterface {
    key: string;
    value: string;
}

export interface CustomizationSettingsInterface {
    theme_id: number;
    theme_colors: {
        [key: string]: ThemeColorInterface[];
    };
    borderRadius: number;
}

interface CustomizationSettings {
    borderRadius?: number;
    theme_colors?: {
        light?: ThemeColorInterface[];
        dark?: ThemeColorInterface[];
    };
}

export const transformThemeColors = (themeConfig: any) => {
    const colorsArray: ThemeColorInterface[] = [];
    const groupWithGroupIndex = new Set(["text-color"]);
    const groupsWithKeyIndex = new Set(["Controls", "Navbar", "System"]);
    const excludeKeys = new Set(["description", "parent", "type", "value"]); // keys to exclude

    for (const group in themeConfig) {
        Object.entries(themeConfig[group]).forEach(([key, details]: [string, any]) => {
            if (groupsWithKeyIndex.has(group) || groupWithGroupIndex.has(group)) {
                // For groups where keys are formatted as "key-index" or "group-index"
                Object.entries(details).forEach(([index, attr]: [string, any]) => {
                    if (!excludeKeys.has(index)) {
                        // Only add if not an excluded key
                        const fullKey = groupWithGroupIndex.has(group) ? `${group}-${index}` : `${key}-${index}`;
                        colorsArray.push({
                            key: fullKey,
                            value: attr.value,
                        });
                    }
                });
            } else {
                if (!excludeKeys.has(key)) {
                    colorsArray.push({
                        key: key,
                        value: details.value,
                    });
                }
            }
        });
    }

    return colorsArray;
};

const generateInlineCSSVariables = (customization?: CustomizationSettings): string => {
    if (!customization) return "";

    let cssVariables = "";

    if (customization.theme_colors?.light) {
        customization.theme_colors.light.forEach((color) => {
            cssVariables += `--${color.key}: ${color.value} !important; `;
        });
    }

    if (customization.theme_colors?.dark) {
        customization.theme_colors.dark.forEach((color) => {
            cssVariables += `--${color.key}: ${color.value} !important; `;
        });
    }

    return cssVariables;
};

export const generateInitialCSS = (
    lightThemeConfig: CustomizationSettingsInterface | null,
    darkThemeConfig: CustomizationSettingsInterface | null
): { htmlStyles: string; bodyStyles: string } => {
    const transformedLightConfig = lightThemeConfig ? transformThemeColors(lightThemeConfig) : null;
    const transformedDarkConfig = darkThemeConfig ? transformThemeColors(darkThemeConfig) : null;

    const lightCSS = transformedLightConfig
        ? generateInlineCSSVariables({ theme_colors: { light: transformedLightConfig } })
        : "";
    const darkCSS = transformedDarkConfig
        ? generateInlineCSSVariables({ theme_colors: { dark: transformedDarkConfig } })
        : "";

    return {
        htmlStyles: lightCSS,
        bodyStyles: darkCSS,
    };
};

export const getColorConfigFiles = () => {
    let lightColorsConfig: CustomizationSettingsInterface | null = null;
    let darkColorsConfig: CustomizationSettingsInterface | null = null;

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
    }

    return { lightColorsConfig, darkColorsConfig };
};
