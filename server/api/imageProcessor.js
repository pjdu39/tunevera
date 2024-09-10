import sharp from 'sharp';

export default defineEventHandler(async (event) => {
    return new Promise((resolve, reject) => {
        const chunks = [];
        event.node.req.on('data', chunk => {
            chunks.push(chunk);
        });

        event.node.req.on('end', () => {
            const completeBuffer = Buffer.concat(chunks);
            const contentType = event.node.req.headers['content-type'];
            const boundary = `--${contentType.match(/boundary=(.*)$/)[1]}`;
            const boundaryBuffer = Buffer.from(boundary, 'utf8');
            const doubleCRLF = Buffer.from('\r\n\r\n', 'utf8');

            let position = 0;
            while (position < completeBuffer.length) {
                const boundaryIndex = completeBuffer.indexOf(boundaryBuffer, position);
                if (boundaryIndex < 0) break;  // No more boundaries found
                position = boundaryIndex + boundaryBuffer.length;

                const endBoundaryIndex = completeBuffer.indexOf(boundaryBuffer, position);
                if (endBoundaryIndex < 0) break;  // No end boundary found

                const partBuffer = completeBuffer.slice(position, endBoundaryIndex);
                position = endBoundaryIndex;

                const headerEndIndex = partBuffer.indexOf(doubleCRLF);
                if (headerEndIndex !== -1) {
                    const headers = partBuffer.slice(0, headerEndIndex).toString('utf8');
                    if (headers.includes('filename=')) {
                        const imageDataStart = headerEndIndex + doubleCRLF.length;
                        const imageDataEnd = partBuffer.lastIndexOf(Buffer.from('\r\n', 'utf8'));
                        const imageData = partBuffer.slice(imageDataStart, imageDataEnd);

                        sharp(imageData)
                            .toFormat('webp')
                            .toBuffer()
                            .then(outputBuffer => {
                                event.node.res.setHeader('Content-Type', 'image/webp');
                                event.node.res.end(outputBuffer);
                                resolve();
                            })
                            .catch(error => {
                                console.error('Error processing the image:', error);
                                event.node.res.statusCode = 500;
                                event.node.res.end('Error processing the image');
                                reject(error);
                            });
                        return;
                    }
                }
            }

            if (!event.node.res.writableEnded) {
                event.node.res.statusCode = 400;
                event.node.res.end("No image part found.");
                reject(new Error("No image part found."));
            }
        });

        event.node.req.on('error', error => {
            console.error('Error in request stream:', error);
            event.node.res.statusCode = 500;
            event.node.res.end('Error in request stream.');
            reject(error);
        });
    });
});
