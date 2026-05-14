import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: 'website' | 'article';
  siteName?: string;
  noIndex?: boolean;
  structuredData?: object | object[];
}

const Seo: React.FC<SEOProps> = ({
  title = "Free BaZi Reading & Chinese Astrology",
  description = "Get free BaZi Four Pillars analysis, Zi Wei Dou Shu readings, daily horoscopes, and zodiac compatibility insights.",
  keywords = [
    "bazi reading", "chinese astrology", "four pillars", "zi wei dou shu",
    "daily horoscope", "zodiac compatibility"
  ],
  image = "https://fortunetelling.it.com/og-image.jpg",
  imageAlt = "Chinese astrology and BaZi fortune telling chart",
  url = "https://fortunetelling.it.com/",
  type = "website",
  siteName = "Chinese Astrology & Fortune Telling",
  noIndex = false,
  structuredData
}) => {
  const fullTitle = title.includes("Chinese") || title.includes("BaZi") ? title : `${title} | Chinese Astrology & Fortune Telling`;
  const robotsContent = noIndex ? 'noindex, nofollow, noarchive' : 'index, follow, max-image-preview:large';
  const structuredDataItems = Array.isArray(structuredData) ? structuredData : structuredData ? [structuredData] : [];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="author" content="Chinese Astrology & Fortune Telling" />
      <meta name="application-name" content={siteName} />
      
      {/* Canonical URL */}
      {!noIndex && <link rel="canonical" href={url} />}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="zh_CN" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta name="twitter:site" content="@ChineseAstrology" />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#4338ca" />
      <meta name="msapplication-TileColor" content="#4338ca" />
      
      {/* Structured Data */}
      {structuredDataItems.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
