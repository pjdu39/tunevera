import { defineEventHandler, send } from 'h3'
import { PostTypes } from '~/enums/PostTypes';

export default defineEventHandler(async (event) => {
    const { env } = useRuntimeConfig().public;

    const apiUrl = useRuntimeConfig().public.apiUrl;

    const url = event.node.req.headers.host; // Acceder al host desde el request
    const clientUrl = env.includes('development') && url.includes('localhost') ? `https://${url}/` : `${url}/`;

    try {
        console.log(`${apiUrl}GetSitemapIds`)
        const response = await fetch(`${apiUrl}GetSitemapIds`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
    
        // Crea las urls en base a las recetas e hilos disponibles.
        let urls = [
            { loc: `${clientUrl}`, lastmod: '2024-01-01', changefreq: 'weekly', priority: 1.0 },
        ];

        data.forEach((data) => {
            if (data.type === PostTypes.RECIPE) {
                urls.push({ loc: `${clientUrl}receta?id=${data.id}`, lastmod: '2024-01-01', changefreq: 'yearly', priority: 1.0 })
            }
            else if (data.type === PostTypes.THREAD) {
                urls.push({ loc: `${clientUrl}foro?id=${data.id}`, lastmod: '2024-01-01', changefreq: 'weekly', priority: 0.7 })
            }
        });
    
        // Crea el sitemap XML
        let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>';
        sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        urls.forEach(url => {
          sitemapContent += `<url><loc>${url.loc}</loc><lastmod>${url.lastmod}</lastmod><changefreq>${url.changefreq}</changefreq><priority>${url.priority}</priority></url>`;
        });
        sitemapContent += '</urlset>';
    
        event.node.res.setHeader('Content-Type', 'application/xml');
        event.node.res.writeHead(200); // Estado HTTP OK
        event.node.res.end(sitemapContent);
    
      } catch (error) {
        console.error('Fetch error:', error);
        event.node.res.setHeader('Content-Type', 'text/plain');
        event.node.res.writeHead(500);
        event.node.res.end(`Server error: ${error.message}`);
      }
})