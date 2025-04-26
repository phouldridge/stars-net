import { existsSync, mkdirSync, readdirSync } from 'fs'
import { resolve, join } from 'path'
import sharp from 'sharp'

const [, , inputDir, imageFile] = process.argv

if (!inputDir || !imageFile) {
  console.error('Usage: npm run index-images <folder> <imageFile>')
  process.exit(1)
}

const inputPath = resolve(inputDir)
const outputPath = resolve('src/images')

// Ensure output directory exists
if (!existsSync(outputPath)) {
  mkdirSync(outputPath, { recursive: true })
}

const processFiles = async inputPath => {
  try {
    const files = readdirSync(inputPath).filter(file => file.endsWith('.png'))

    const buffers = await Promise.all(files.map(file => sharp(join(inputPath, file)).ensureAlpha().toBuffer()))

    const { width, height } = await sharp(buffers[0]).metadata()
    const totalHeight = height * buffers.length

    const composite = buffers.map((buf, i) => ({
      input: buf,
      top: i * height,
      left: 0
    }))

    await sharp({
      create: {
        width,
        height: totalHeight,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite(composite)
      .png()
      .toFile(join(outputPath, imageFile))
  } catch (error) {
    console.error('Error building image index:', error)
  }
}

await processFiles(inputPath)
