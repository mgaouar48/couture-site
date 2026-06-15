import { Jimp } from 'jimp';
import path from 'path';

async function run() {
  const imagePath = path.resolve('public/images/logo_clean.png');
  try {
    const image = await Jimp.read(imagePath);
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    
    let edgeOpaqueCount = 0;
    
    // Check borders (width of 10 pixels)
    const borderWidth = 10;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        // If the pixel is near the edge
        const isNearEdge = x < borderWidth || x >= w - borderWidth || y < borderWidth || y >= h - borderWidth;
        if (isNearEdge) {
          const hex = image.getPixelColor(x, y);
          const a = hex & 0xff;
          if (a > 0) {
            edgeOpaqueCount++;
            if (edgeOpaqueCount < 10) {
              console.log(`Opaque pixel near edge at (${x}, ${y}): hex=0x${hex.toString(16)}`);
            }
          }
        }
      }
    }
    
    console.log(`Total opaque pixels near edges: ${edgeOpaqueCount}`);
  } catch (err) {
    console.error(err);
  }
}

run();
