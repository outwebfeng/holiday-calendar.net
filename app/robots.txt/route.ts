import { MetadataRoute } from 'next'
 
export function GET() {
  return new Response(`# *
User-agent: *
Allow: /
Sitemap: https://holidaycalendar.net/sitemap.xml`)
}
