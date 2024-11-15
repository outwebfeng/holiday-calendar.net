import { MetadataRoute } from 'next'
import { locales } from '@/config/site'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://holidaycalendar.net'
  
  // 为每个语言创建首页URL
  const routes = locales.flatMap(locale => {
    return [
      {
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      // 如果有其他固定页面，可以在这里添加
      // {
      //   url: `${baseUrl}/${locale}/about`,
      //   lastModified: new Date(),
      //   changeFrequency: 'monthly' as const,
      //   priority: 0.8,
      // },
    ]
  })

  return routes
}
