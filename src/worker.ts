type PlanId = 'essential' | 'pro' | 'annual';

type Env = {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  DODO_PAYMENTS_API_KEY?: string;
  DODO_PAYMENTS_ENVIRONMENT?: 'test' | 'live';
  DODO_PAYMENTS_API_BASE_URL?: string;
  DODO_PRODUCT_ESSENTIAL?: string;
  DODO_PRODUCT_PRO?: string;
  DODO_PRODUCT_ANNUAL?: string;
  PUBLIC_SITE_URL?: string;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
};

type CheckoutRequest = {
  planId?: PlanId;
  source?: string;
  language?: string;
  path?: string;
};

type DodoCheckoutResponse = {
  session_id?: string;
  checkout_url?: string | null;
  error?: unknown;
  message?: string;
};

type SupabaseUserResponse = {
  id?: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
};

type SeoMetadata = {
  title: string;
  description: string;
  canonical: string;
  noIndex?: boolean;
};

const planProductEnvKeys: Record<PlanId, keyof Env> = {
  essential: 'DODO_PRODUCT_ESSENTIAL',
  pro: 'DODO_PRODUCT_PRO',
  annual: 'DODO_PRODUCT_ANNUAL',
};

const allowedPlans = new Set<PlanId>(['essential', 'pro', 'annual']);
const siteUrl = 'https://fortunetelling.it.com';
const zodiacSigns = new Set([
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
]);

const staticSeoByPath: Record<string, SeoMetadata> = {
  '/': {
    title: 'Free BaZi Reading & Chinese Astrology',
    description: 'Get free BaZi Four Pillars analysis, Zi Wei Dou Shu readings, daily horoscopes, and zodiac compatibility insights.',
    canonical: `${siteUrl}/`,
  },
  '/readings': {
    title: 'Free BaZi Reading | Four Pillars Birth Chart Analysis',
    description: 'Generate a free BaZi reading with Four Pillars, Five Elements balance, Day Master insights, and Chinese astrology chart guidance.',
    canonical: `${siteUrl}/readings`,
  },
  '/zi-wei': {
    title: 'Zi Wei Dou Shu Chart Generator | Chinese Astrology',
    description: 'Generate your Zi Wei Dou Shu chart with 12 palace analysis, major stars, transformations, destiny stars, and Chinese astrology insights.',
    canonical: `${siteUrl}/zi-wei`,
  },
  '/compatibility': {
    title: 'Zodiac Compatibility Calculator | Love & Relationship',
    description: 'Compare zodiac compatibility for two signs across love, friendship, and business with relationship strengths and practical guidance.',
    canonical: `${siteUrl}/compatibility`,
  },
  '/about': {
    title: 'About Chinese Astrology | BaZi & Zi Wei Dou Shu',
    description: 'Learn about BaZi Four Pillars, Zi Wei Dou Shu, Five Elements, and the Chinese astrology systems used for modern life guidance.',
    canonical: `${siteUrl}/about`,
  },
  '/subscription': {
    title: 'Premium BaZi Report | Four Pillars & Luck Cycles',
    description: 'Unlock a premium BaZi report with Four Pillars interpretation, Five Elements balance, Ten Gods, luck cycles, and PDF modules.',
    canonical: `${siteUrl}/subscription`,
  },
  '/checkout/success': {
    title: 'Checkout Success',
    description: 'Payment confirmation page for premium BaZi report access.',
    canonical: `${siteUrl}/checkout/success`,
    noIndex: true,
  },
};

const json = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

const getSeoMetadata = (pathname: string): SeoMetadata | null => {
  const normalizedPath = pathname !== '/' ? pathname.replace(/\/$/, '') : pathname;
  const staticMetadata = staticSeoByPath[normalizedPath];
  if (staticMetadata) return staticMetadata;

  const zodiacSlug = normalizedPath.slice(1);
  if (zodiacSigns.has(zodiacSlug)) {
    const signName = zodiacSlug.charAt(0).toUpperCase() + zodiacSlug.slice(1);
    return {
      title: `${signName} Horoscope Today | Daily Predictions`,
      description: `Get your ${signName} horoscope today with personality traits, daily predictions, love compatibility, career insights, and more.`,
      canonical: `${siteUrl}/${zodiacSlug}`,
    };
  }

  return null;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const replaceHeadTag = (html: string, pattern: RegExp, replacement: string) => {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace('</head>', `    ${replacement}\n  </head>`);
};

const injectSeoMetadata = (html: string, metadata: SeoMetadata) => {
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const canonical = escapeHtml(metadata.canonical);
  const robots = metadata.noIndex ? 'noindex, nofollow, noarchive' : 'index, follow, max-image-preview:large';

  let nextHtml = html.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`);
  nextHtml = replaceHeadTag(nextHtml, /<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${description}" />`);
  nextHtml = replaceHeadTag(nextHtml, /<meta\s+name=["']robots["'][^>]*>/i, `<meta name="robots" content="${robots}" />`);
  nextHtml = replaceHeadTag(nextHtml, /<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
  nextHtml = replaceHeadTag(nextHtml, /<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${title}" />`);
  nextHtml = replaceHeadTag(nextHtml, /<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${description}" />`);
  nextHtml = replaceHeadTag(nextHtml, /<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${canonical}" />`);
  nextHtml = replaceHeadTag(nextHtml, /<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${title}" />`);
  nextHtml = replaceHeadTag(nextHtml, /<meta\s+name=["']twitter:description["'][^>]*>/i, `<meta name="twitter:description" content="${description}" />`);

  return nextHtml;
};

const maybeServeHtmlWithSeo = async (request: Request, env: Env, pathname: string) => {
  const response = await env.ASSETS.fetch(request);
  const metadata = getSeoMetadata(pathname);
  const contentType = response.headers.get('Content-Type') || '';

  if (!metadata || !contentType.includes('text/html')) {
    return response;
  }

  const html = await response.text();
  const headers = new Headers(response.headers);
  headers.set('Content-Type', 'text/html; charset=utf-8');

  return new Response(injectSeoMetadata(html, metadata), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

const getOrigin = (request: Request, env: Env) => {
  if (env.PUBLIC_SITE_URL) return env.PUBLIC_SITE_URL.replace(/\/$/, '');
  return new URL(request.url).origin;
};

const getDodoApiBaseUrl = (env: Env) => {
  if (env.DODO_PAYMENTS_API_BASE_URL) return env.DODO_PAYMENTS_API_BASE_URL.replace(/\/$/, '');
  return env.DODO_PAYMENTS_ENVIRONMENT === 'live'
    ? 'https://live.dodopayments.com'
    : 'https://test.dodopayments.com';
};

const normalizeCheckoutLanguage = (language?: string) => {
  if (language?.startsWith('zh')) return 'zh';
  if (language === 'en') return 'en';
  return undefined;
};

const getBearerToken = (request: Request) => {
  const authorization = request.headers.get('Authorization') || '';
  const [scheme, token] = authorization.split(' ');
  if (scheme.toLowerCase() !== 'bearer' || !token) return null;
  return token;
};

const verifySupabaseUser = async (request: Request, env: Env) => {
  const accessToken = getBearerToken(request);
  if (!accessToken) {
    return { error: json({ error: 'Authentication is required.' }, { status: 401 }) };
  }

  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    return { error: json({ error: 'Supabase authentication is not configured.' }, { status: 500 }) };
  }

  const response = await fetch(`${env.SUPABASE_URL.replace(/\/$/, '')}/auth/v1/user`, {
    headers: {
      apikey: env.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return { error: json({ error: 'Invalid or expired login session.' }, { status: 401 }) };
  }

  const user = (await response.json()) as SupabaseUserResponse;
  if (!user.id || !user.email) {
    return { error: json({ error: 'A verified email account is required for checkout.' }, { status: 401 }) };
  }

  return { user };
};

const handleCheckout = async (request: Request, env: Env) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, { status: 405 });
  }

  if (!env.DODO_PAYMENTS_API_KEY) {
    return json({ error: 'Dodo Payments API key is not configured.' }, { status: 500 });
  }

  const auth = await verifySupabaseUser(request, env);
  if (auth.error) return auth.error;

  let payload: CheckoutRequest;
  try {
    payload = (await request.json()) as CheckoutRequest;
  } catch {
    return json({ error: 'Invalid checkout request.' }, { status: 400 });
  }

  const planId = payload.planId;
  if (!planId || !allowedPlans.has(planId)) {
    return json({ error: 'Invalid checkout plan.' }, { status: 400 });
  }

  const productId = env[planProductEnvKeys[planId]];
  if (!productId) {
    return json({ error: `Dodo product ID is not configured for ${planId}.` }, { status: 500 });
  }

  const origin = getOrigin(request, env);
  const forceLanguage = normalizeCheckoutLanguage(payload.language);
  const checkoutPayload = {
    product_cart: [{ product_id: productId, quantity: 1 }],
    customer: {
      email: auth.user.email,
    },
    return_url: `${origin}/checkout/success?plan=${encodeURIComponent(planId)}`,
    cancel_url: `${origin}/subscription?source=checkout-cancelled&plan=${encodeURIComponent(planId)}#plans`,
    metadata: {
      user_id: auth.user.id,
      email: auth.user.email,
      plan_id: planId,
      source: payload.source || 'subscription',
      language: payload.language || 'unknown',
      path: payload.path || '',
    },
    ...(forceLanguage ? { force_language: forceLanguage } : {}),
  };

  const response = await fetch(`${getDodoApiBaseUrl(env)}/checkouts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.DODO_PAYMENTS_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(checkoutPayload),
  });

  const dodoResponse = (await response.json()) as DodoCheckoutResponse;

  if (!response.ok || !dodoResponse.checkout_url) {
    return json(
      {
        error: dodoResponse.message || 'Failed to create Dodo checkout session.',
        details: dodoResponse.error,
      },
      { status: response.ok ? 502 : response.status }
    );
  }

  return json({
    checkoutUrl: dodoResponse.checkout_url,
    sessionId: dodoResponse.session_id,
  });
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/checkout') {
      return handleCheckout(request, env);
    }

    return maybeServeHtmlWithSeo(request, env, url.pathname);
  },
};
