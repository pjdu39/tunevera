import { ImageTypes } from "~/enums/ImageTypes";

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
    const resizeImage = async (file, maxResolution = 1000, targetSizeKB = 1500) => {
        const pngFile = await convertImageTo(file, ImageTypes.PNG)
        return new Promise((resolve, reject) => {
          const img = new Image();
          const reader = new FileReader();
      
          reader.onload = (e) => {
            img.src = e.target.result;
            img.onload = () => {
              let width = img.width > maxResolution ? maxResolution : img.width;
              let height = img.height > maxResolution ? maxResolution : img.height;
      
              const updateCanvas = () => {
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
      
                const ctx = canvas.getContext("2d");
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";
                ctx.drawImage(img, 0, 0, width, height);
      
                // TODO: Ajustar la reducción de calidad en base a una aproximación de cuánta hay que reducir finalmente para evitar demasiadas iteraciones.
                canvas.toBlob(
                  (blob) => {
                    const sizeKB = blob.size / 1024;
                    if (sizeKB > targetSizeKB) {
                        if (width > 200 && height > 200) { // Asegurarse de que la resolución no sea demasiado baja
                            width *= 0.95; // Reducir la resolución
                            height *= 0.95;
                        }
                        updateCanvas(); // Reintentar con menor resolución
                    } else {
                        resolve(blob); // Tamaño aceptable
                    }
                  },
                  pngFile.type
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
      
          reader.readAsDataURL(pngFile);
        });
    };

    const convertImageTo = (file, extension) => {
        if (!Object.values(ImageTypes).includes(extension))
          return

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob((blob) => {
                        resolve(blob);
                    }, `image/${extension}`);
                };
                img.onerror = reject;
                img.src = event.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    // LLamada a servidor de node
    const serverConversion = async (
        newFileName,
        blob,
        extension = ImageTypes.WEBP
    ) => {
        const formData = new FormData();
        formData.append("image", blob, newFileName);
    
        try {
        // Llamada a la API para procesar la imagen
        const response = await fetch("/api/imageProcessor", {
            method: "POST",
            body: formData,
        });
    
        if (response.ok) {
            const newBlob = await response.blob();
    
            // Devuelve un nuevo File object para subirlo a blobStore si es necesario
            return new File([newBlob], newFileName, {
            type: `image/${extension}`,
            lastModified: new Date(),
            });
        } else {
            throw new Error("Failed to upload and convert image");
        }
        } catch (error) {
        console.error("Error handling file edit:", error);
        throw error; // Propaga el error para manejo superior si es necesario
        }
    };

    return {
        resizeImage,
        convertImageTo,
        serverConversion
    };
}