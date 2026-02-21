#!/usr/bin/env node
/**
 * Generate all favicon files from the VLN icon SVG
 * Generates PNG files in various sizes and ICO file
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const iconSvgPath = path.join(publicDir, 'vln-icon.svg');

// Favicon sizes to generate
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

async function generateFavicons() {
  console.log('Generating favicon files from vln-icon.svg...\n');

  try {
    // Read the SVG file
    const svgBuffer = fs.readFileSync(iconSvgPath);

    // Generate PNG files
    for (const { name, size } of sizes) {
      const outputPath = path.join(publicDir, name);

      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);

      console.log(`✓ Generated ${name} (${size}x${size})`);
    }

    // Generate favicon.ico (16x16, 32x32, 48x48 multi-size ICO)
    // Note: sharp doesn't support ICO format directly, so we'll create PNGs
    // and document that favicon.ico should be created from these
    console.log('\n✓ All PNG files generated successfully!');
    console.log('\nNote: favicon.ico should contain 16x16, 32x32, and 48x48 sizes.');
    console.log('For production, use a tool like png2ico or online converter to create favicon.ico from:');
    console.log('  - favicon-16x16.png');
    console.log('  - favicon-32x32.png');
    console.log('  - favicon-48x48.png');

  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
