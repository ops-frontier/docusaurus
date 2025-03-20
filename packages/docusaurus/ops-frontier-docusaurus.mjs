#!/usr/bin/env node

import { spawn } from "node:child_process"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { existsSync, mkdirSync } from "node:fs"
import { createReadStream } from "node:fs"
import { createWriteStream } from "node:fs"
import { pipeline } from "node:stream/promises"
import { createUnzip } from "node:zlib"
import unzipper from "unzipper"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const OPS_FRONTIER_PROJECT_ROOT = process.env.OPS_FRONTIER_PROJECT_ROOT || process.cwd()
const OPS_FRONTIER_DOCUSAURUS_PATH = `${OPS_FRONTIER_PROJECT_ROOT}/.ops-frontier-docusaurus`
process.env.OPS_FRONTIER_DOCS_PATH = `${OPS_FRONTIER_PROJECT_ROOT}/docs`

if (!existsSync(process.env.OPS_FRONTIER_DOCS_PATH)) {
    console.error(`Error: ${process.env.OPS_FRONTIER_DOCS_PATH} does not exist.`)
    process.exit(1)
}

if (process.argv.length < 3) {
    console.error("Usage: ops-frontier-docusaurus <command> [options]")
    process.exit(1)
} else if (process.argv[2] === "init") {
    // Check if OPS_FRONTIER_DOCUSAURUS_PATH exists, create it and unzip if not
    if (!existsSync(OPS_FRONTIER_DOCUSAURUS_PATH)) {
        console.log(`OPS_FRONTIER_DOCUSAURUS_PATH does not exist. Creating: ${OPS_FRONTIER_DOCUSAURUS_PATH}`)
        mkdirSync(OPS_FRONTIER_DOCUSAURUS_PATH, { recursive: true })

        const zipFilePath = join(__dirname, "ops-frontier-docusaurus.zip")
        if (existsSync(zipFilePath)) {
            console.log(`Unzipping ${zipFilePath} to ${OPS_FRONTIER_DOCUSAURUS_PATH}`)
            try {
                const directory = await unzipper.Open.file(zipFilePath);
                await directory.extract({ path: OPS_FRONTIER_DOCUSAURUS_PATH })
                console.log(`Successfully unzipped ${zipFilePath} to ${OPS_FRONTIER_DOCUSAURUS_PATH}`)
            } catch (error) {
                console.error(`Error unzipping ${zipFilePath}:`, error)
                process.exit(1)
            }
            process.exit(0)
        } else {
            console.error(`Error: ${zipFilePath} not found.`)
            process.exit(1)
        }
    } else {
        console.log(
            `${OPS_FRONTIER_DOCUSAURUS_PATH} already exists. Not unzipping. If you want to reinitialize, delete the directory and run the command again.`,
        )
        process.exit(1)
    }
}

const p = spawn("npx", ["docusaurus", ...process.argv.slice(2)], {
    stdio: "inherit",
    cwd: __dirname,
})
p.on("close", (code) => process.exit(code))
