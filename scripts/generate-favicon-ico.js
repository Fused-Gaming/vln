#!/usr/bin/env node
/**
 * Generate favicon.ico from PNG files
 */

const toIco = require('to-ico');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

async function generateFaviconIco() {
  console.log('Generating favicon.ico from PNG files...\n');

  try {
    // Read the PNG files
    const pngs = [
      fs.readFileSync(path.join(publicDir, 'favicon-16x16.png')),
      fs.readFileSync(path.join(publicDir, 'favicon-32x32.png')),
      fs.readFileSync(path.join(publicDir, 'favicon-48x48.png')),
    ];

    // Generate ICO file
    const icoBuffer = await toIco(pngs);

    // Write to file
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

    console.log('✓ Generated favicon.ico (16x16, 32x32, 48x48)\n');
  } catch (error) {
    console.error('Error generating favicon.ico:', error);
    process.exit(1);
  }
}

generateFaviconIco();
