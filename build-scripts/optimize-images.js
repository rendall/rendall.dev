/** Optimize and resize images in ./static  Run this manually whenever
 * new images are added. It will resize images, write them into ./static
 *
 * Optionally include a filename that is already in static in order
 * to resize that file only.
 */

const sharp = require("sharp")
const glob = require("glob")
const path = require("path")
const fs = require("fs-extra")

const inputDir = path.join(__dirname, "../static/images")
const outputDir = path.join(__dirname, "../static/images")
const excludeDir = "icons"

const optimizeImages = async () => {
  const targetFile = process.argv[2]
  const files = getFilesToProcess(targetFile)

  // Define the desired output widths and quality
  const widths = [360, 480, 800, 1200, 2400, 4800]
  const quality = 80

  // Loop through each file and resize it
  for (const file of files) {
    const inputPath = path.join(inputDir, file)
    const outputPath = path.join(outputDir, file)
    const fileExtension = path.extname(file)
    const src = path.dirname(file)
    const outputDirname = path.join(outputDir, src)
    const filename = path.basename(file, fileExtension)
    const image = sharp(inputPath)

    // Get the image dimensions
    let dimensions
    try {
      dimensions = await image.metadata()
    } catch (error) {
      console.error(`Error getting image dimensions for ${inputPath}: ${error}`)
      continue
    }

    // Create the output directory if it doesn't exist
    if (!fs.existsSync(outputDirname)) {
      fs.mkdirSync(outputDirname, { recursive: true })
    }

    // Copy the input file to the output directory
    if (outputDir !== inputDir) fs.copySync(inputPath, outputPath)

    let srcset = []

    // Loop through each desired width and output the resized image
    for (const width of widths) {
      const outputFilename = `${filename}-${width}w${fileExtension}`
      const outputPath = path.join(outputDirname, outputFilename)

      if (dimensions.width > width) {
        srcset.push(`/${src}/${outputFilename} ${width}w`)
        image
          .resize(width)
          .jpeg({ quality })
          .png({ quality })
          .toFile(outputPath)
          .then(() => {
            console.log(`     Resized ${inputPath} to ${width}px`)
          })
          .catch((error) => {
            console.error(`Error resizing ${inputPath} to ${width}px: ${error}`)
          })
      }
    }

    console.log(
      "\n" + `<img src="/${file}" srcset="${srcset.join(", ")}">` + "\n"
    )
  }
}

const getFilesToProcess = (targetFile) => {
  if (targetFile) {
    const targetFilePath = path.join(inputDir, targetFile)
    if (!fs.existsSync(targetFilePath)) {
      console.error(`Error: File not found - ${targetFilePath}`)
      process.exit(1)
    }
    return [targetFile]
  } else {
    return glob
      .sync(`**/!(${excludeDir})/**/*.{jpg,jpeg,png}`, {
        cwd: inputDir,
      })
      .filter((filename) => !/-\d{3,4}w\.(jpe?g|png)$/.test(filename))
  }
}
/*
<img src="example.jpg"
     srcset="example-small.jpg 480w,
             example-medium.jpg 800w,
             example-large.jpg 1200w"
     alt="Example image">
*/

optimizeImages()
