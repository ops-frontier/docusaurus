import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import simplePlantUML from "@akebifiky/remark-simple-plantuml";
import unknownHandler from "./src/components/unknownHandler";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: "Ops Frontier",
    tagline: "Supreme DevSecOps Platform",
    favicon: "img/favicon.ico",

    // Set the production url of your site here
    url: "https://ops-frontier.dev",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "ops-frontier", // Usually your GitHub org/user name.
    projectName: "docusaurus", // Usually your repo name.

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "ja",
        locales: ["ja"],
    },

    markdown: {
        remarkRehypeOptions: {
            unknownHandler,
        },
    },

    presets: [
        [
            "@docusaurus/preset-classic",
            {
                docs: {
                    path: process.env.OPS_FRONTIER_DOCS_PATH || "docs",
                    sidebarPath: "./sidebars.ts",
                    remarkPlugins: [
                        [
                          simplePlantUML,
                          { baseUrl: "https://www.plantuml.com/plantuml/svg" },
                        ],
                    ],
                },
                blog: false,
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: "img/devsecops.svg",
        navbar: {
            title: "",
            logo: {
                alt: "Ops Frontier Logo",
                src: "img/symbol_logo_4c.svg",
            },
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "devGuide",
                    position: "left",
                    label: "開発者ガイド",
                },
                {
                    type: "docSidebar",
                    sidebarId: "devDesign",
                    position: "left",
                    label: "設計書",
                },
                // {
                //     type: "docSidebar",
                //     sidebarId: "devSpecification",
                //     position: "left",
                //     label: "仕様書/テスト項目書",
                // },
                // {
                //     type: "docSidebar",
                //     sidebarId: "adminGuide",
                //     position: "left",
                //     label: "管理者マニュアル",
                // },
                // {
                //     type: "docSidebar",
                //     sidebarId: "userGuide",
                //     position: "left",
                //     label: "利用者マニュアル",
                // },
                {
                    href: "https://github.com/ops-frontier/repositories",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
}

export default config;
