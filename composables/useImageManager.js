export function useImageManager() {
    /*
    const resizeImage = async (file, maxWidth = 500, maxHeight = 500) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
        img.src = e.target.result;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;

            // Calcular la escala manteniendo la proporción
            const scale = Math.min(maxWidth / width, maxHeight / height);
            if (scale < 1) {
            width = Math.round(width * scale);
            height = Math.round(height * scale);
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high'; // Opciones: 'low', 'medium', 'high'

            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
            (blob) => {
                resolve(blob);
            },
            file.type,
            1
            );
        };

        img.onerror = (err) => {
            reject(err);
        };
        };

        reader.onerror = (err) => {
        reject(err);
        };

        reader.readAsDataURL(file);
    });
    };
    */
    /*
    const resizeImage = async (file, targetSizeKB = 700) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
        img.src = e.target.result;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            // Dibujar la imagen original en el canvas
            ctx.drawImage(img, 0, 0, img.width, img.height);

            // Convertir inicialmente la imagen a Blob para obtener su tamaño inicial
            canvas.toBlob(
            (initialBlob) => {
                const initialSizeKB = initialBlob.size / 1024;
                // Calcular la calidad necesaria usando una regla de tres
                const quality = Math.max(
                0,
                Math.min(1, targetSizeKB / initialSizeKB)
                );

                // Convertir la imagen a Blob con la calidad calculada
                canvas.toBlob(
                (blob) => {
                    resolve(blob);
                },
                file.type,
                quality
                );
            },
            file.type,
            1 // Máxima calidad para medir el tamaño inicial
            );
        };

        img.onerror = (err) => {
            reject(err);
        };
        };

        reader.onerror = (err) => {
        reject(err);
        };

        reader.readAsDataURL(file);

        console.log('he redimensionado la imagen')
    });
    };
    */
    const resizeImage = async (file, maxResolution = 500, targetSizeKB = 500) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const reader = new FileReader();
      
          reader.onload = (e) => {
            img.src = e.target.result;
            img.onload = () => {
              let width = img.width > maxResolution ? maxResolution : img.width;
              let height = img.height > maxResolution ? maxResolution : img.height;
              let quality = 1;
      
              const updateCanvas = () => {
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
      
                const ctx = canvas.getContext("2d");
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";
                ctx.drawImage(img, 0, 0, width, height);
      
                canvas.toBlob(
                  (blob) => {
                    const sizeKB = blob.size / 1024;
                    if (sizeKB > targetSizeKB) {
                      quality *= 0.9; // Reducir la calidad en un 10% del valor actual
                      if (quality < 0.05) {
                        // Si la calidad es extremadamente baja
                        if (width > 200 && height > 200) {
                          // Asegurarse de que la resolución no sea demasiado baja
                          width *= 0.95; // Reducir también la resolución
                          height *= 0.95;
                        }
                      }
                      updateCanvas(); // Reintentar con menor calidad y/o resolución
                    } else {
                      resolve(blob); // Tamaño aceptable
                    }
                  },
                  file.type,
                  quality
                );
              };
      
              updateCanvas();
            };
      
            img.onerror = (err) => {
              reject(err);
            };
          };
      
          reader.onerror = (err) => {
            reject(err);
          };
      
          reader.readAsDataURL(file);
        });
    };

    return {
        resizeImage
    };
}