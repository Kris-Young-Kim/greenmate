import sharp from "sharp"
import * as path from "path"
import * as fs from "fs"

const SRC = path.resolve("public/icons/source.svg")
const svgBuffer = fs.readFileSync(SRC)

async function main() {
  for (const size of [192, 512]) {
    const out = path.resolve(`public/icons/icon-${size}.png`)
    await sharp(svgBuffer).resize(size, size).png().toFile(out)
    console.log(`✓ icon-${size}.png`)
  }
  // Apple touch icon (180x180)
  const apple = path.resolve("public/apple-touch-icon.png")
  await sharp(svgBuffer).resize(180, 180).png().toFile(apple)
  console.log("✓ apple-touch-icon.png")
}

main().catch(console.error)
