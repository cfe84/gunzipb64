const zlib = require('zlib');

function decodeBase64Gzip(encodedString) {
  const buffer = Buffer.from(encodedString, 'base64');
  
  return new Promise((resolve, reject) => {
    zlib.gunzip(buffer, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.toString());
      }
    });
  });
}

(async () => {
  let input = '';

  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => {
    input += chunk;
  });

  process.stdin.on('end', async () => {
    try {
      const decoded = await decodeBase64Gzip(input.trim());
      process.stdout.write(decoded);
    } catch (err) {
      console.error('Error decoding the input:', err.message);
      process.exit(1);
    }
  });
})();
 
