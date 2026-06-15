import { Jimp } from 'jimp';
import path from 'path';

async function run() {
  const inputPath = path.resolve('public/images/logo_clean.png');
  const outputPath = path.resolve('public/images/logo_pink_white.png');
  
  try {
    const image = await Jimp.read(inputPath);
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    
    // 1. Find all pink pixels in the original image
    const pinkPixels = [];
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const hex = image.getPixelColor(x, y);
        const r = (hex >> 24) & 0xff;
        const g = (hex >> 16) & 0xff;
        const b = (hex >> 8) & 0xff;
        const a = hex & 0xff;
        
        // Needle pink
        if (a > 30 && r > 120 && g < 110 && b > 50 && (r - g > 40)) {
          pinkPixels.push({ x, y });
        }
      }
    }
    
    console.log(`Found ${pinkPixels.length} base pink pixels.`);
    
    // 2. Perform pixel processing
    let transparentCount = 0;
    let whiteCount = 0;
    let enrichedPinkCount = 0;
    
    const d = 6; // Distance threshold for shadow/outline detection
    
    for (let y = 0; y < h; y++) {
      const isTextRow = y >= 630 && y <= 666;
      
      for (let x = 0; x < w; x++) {
        const hex = image.getPixelColor(x, y);
        const r = (hex >> 24) & 0xff;
        const g = (hex >> 16) & 0xff;
        const b = (hex >> 8) & 0xff;
        const a = hex & 0xff;
        
        if (a > 0) {
          // Rule A: Needle region (X < 260)
          if (x < 260) {
            // Find distance to the needle
            let minDist = 999;
            for (const p of pinkPixels) {
              if (Math.abs(p.x - x) <= 8 && Math.abs(p.y - y) <= 8) {
                const dist = Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2);
                if (dist < minDist) {
                  minDist = dist;
                }
              }
            }
            
            if (minDist <= 6) {
              // It is part of the needle or its immediate shadow
              const isPinkish = r > 100 && (r - g) > 30;
              if (isPinkish) {
                // Keep it pink and enrich it if needed
                if (g > 80) {
                  const newG = Math.round(g * 0.4);
                  const newB = Math.round(b * 0.6);
                  const newHex = (((r << 24) | (newG << 16) | (newB << 8) | a) >>> 0);
                  image.setPixelColor(newHex, x, y);
                  enrichedPinkCount++;
                }
              } else {
                // Gray shadow/outline made transparent
                image.setPixelColor(0x00000000, x, y);
                transparentCount++;
              }
            } else {
              // Outside the needle body, made transparent
              image.setPixelColor(0x00000000, x, y);
              transparentCount++;
            }
            continue;
          }
          
          // Rule B: Rest of the image (X >= 260)
          const isPinkish = r > 100 && (r - g) > 35;
          if (isPinkish) {
            // Enrich pink pixels (like the F loop)
            if (g > 80) {
              const newG = Math.round(g * 0.4);
              const newB = Math.round(b * 0.6);
              const newHex = (((r << 24) | (newG << 16) | (newB << 8) | a) >>> 0);
              image.setPixelColor(newHex, x, y);
              enrichedPinkCount++;
            }
            continue;
          }
          
          if (isTextRow) {
            // White text for MERCERIE EN LIGNE
            const newHex = (((255 << 24) | (255 << 16) | (255 << 8) | a) >>> 0);
            image.setPixelColor(newHex, x, y);
            whiteCount++;
          } else {
            // Check distance to pink for outlines
            let isCloseToPink = false;
            for (const p of pinkPixels) {
              if (Math.abs(p.x - x) <= d && Math.abs(p.y - y) <= d) {
                const dist = Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2);
                if (dist <= d) {
                  isCloseToPink = true;
                  break;
                }
              }
            }
            
            if (isCloseToPink) {
              image.setPixelColor(0x00000000, x, y);
              transparentCount++;
            } else {
              if (r < 140 && g < 140 && b < 140) {
                const newHex = (((255 << 24) | (255 << 16) | (255 << 8) | a) >>> 0);
                image.setPixelColor(newHex, x, y);
                whiteCount++;
              }
            }
          }
        }
      }
    }
    
    console.log(`Processed pixels:`);
    console.log(`- Recolored to transparent: ${transparentCount}`);
    console.log(`- Enriched pink: ${enrichedPinkCount}`);
    console.log(`- Recolored dark to white: ${whiteCount}`);
    
    await image.write(outputPath);
    console.log('Saved final flawless logo to:', outputPath);
    
  } catch (err) {
    console.error(err);
  }
}

run();
