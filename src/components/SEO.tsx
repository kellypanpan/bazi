import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  siteName?: string;
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = "BaZi Chinese Astrology | Free BaZi Readings, BaZi Compatibility & Zi Wei",
  description = "Free BaZi readings and BaZi analysis for Chinese astrology. Explore BaZi compatibility, Four Pillars (BaZi) destiny insights, Zi Wei Dou Shu, daily horoscope and personalized Chinese fortune guidance.",
  keywords = [
    "bazi", "bazi analysis", "bazi reading", "bazi readings", "bazi compatibility",
    "four pillars", "four pillars of destiny", "zi wei dou shu", "chinese astrology",
    "fortune telling", "horoscope", "zodiac compatibility", "birth chart",
    "chinese fortune", "destiny analysis", "五行", "八字", "紫微斗数"
  ],
  image = "https://fortunetelling.it.com/og-image.jpg",
  url = "https://fortunetelling.it.com/",
  type = "website",
  siteName = "Chinese Astrology & Fortune Telling",
  structuredData
}) => {
  const fullTitle = title.includes("Chinese") || title.includes("BaZi") ? title : `${title} | Chinese Astrology & Fortune Telling`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Chinese Astrology & Fortune Telling" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="zh_CN" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@ChineseAstrology" />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#4338ca" />
      <meta name="msapplication-TileColor" content="#4338ca" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;