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
  SUPABASE_SERVICE_ROLE_KEY?: string;
  DODO_PAYMENTS_WEBHOOK_SECRET?: string;
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

type DodoWebhookEvent = {
  business_id?: string;
  type?: string;
  timestamp?: string;
  data?: {
    payload_type?: string;
    payment_id?: string;
    subscription_id?: string;
    product_id?: string;
    customer_id?: string;
    customer?: {
      customer_id?: string;
      email?: string;
      name?: string;
    };
    metadata?: Record<string, unknown>;
    next_billing_date?: string;
    current_period_end?: string;
    status?: string;
    total_amount?: number;
    currency?: string;
  };
};

type PremiumEntitlement = {
  user_id: string;
  email: string;
  plan_id: PlanId;
  status: 'active' | 'cancelled' | 'expired' | 'failed';
  source?: string;
  dodo_customer_id?: string;
  dodo_payment_id?: string;
  dodo_subscription_id?: string;
  product_id?: string;
  current_period_end?: string;
  updated_at: string;
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

const getSupabaseUrl = (env: Env) => env.SUPABASE_URL?.replace(/\/$/, '');

const getSupabaseServiceHeaders = (env: Env) => {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) return null;
  return {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
  };
};

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

const queryUserEntitlements = async (userId: string, env: Env) => {
  const supabaseUrl = getSupabaseUrl(env);
  const headers = getSupabaseServiceHeaders(env);
  if (!supabaseUrl || !headers) return [];

  const response = await fetch(
    `${supabaseUrl}/rest/v1/premium_entitlements?user_id=eq.${encodeURIComponent(userId)}&select=*&order=updated_at.desc`,
    { headers }
  );

  if (!response.ok) return [];
  return (await response.json()) as PremiumEntitlement[];
};

const handleMe = async (request: Request, env: Env) => {
  if (request.method !== 'GET') {
    return json({ error: 'Method not allowed.' }, { status: 405 });
  }

  const auth = await verifySupabaseUser(request, env);
  if (auth.error) return auth.error;
  if (!auth.user?.id || !auth.user.email) {
    return json({ error: 'Authentication is required.' }, { status: 401 });
  }

  const entitlements = await queryUserEntitlements(auth.user.id, env);
  const activeEntitlements = entitlements.filter((entitlement) => entitlement.status === 'active');

  return json({
    user: {
      id: auth.user.id,
      email: auth.user.email,
    },
    entitlements,
    premium: activeEntitlements.length > 0,
    activePlan: activeEntitlements[0]?.plan_id || null,
  });
};

const encodeUtf8 = (value: string) => new TextEncoder().encode(value);

const toBase64 = (buffer: ArrayBuffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
};

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

const normalizeSignatures = (signatureHeader: string) =>
  signatureHeader
    .split(' ')
    .flatMap((part) => part.split(','))
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.replace(/^v\d+=/, '').replace(/^v\d+:/, ''));

const constantTimeEqual = (left: string, right: string) => {
  if (left.length !== right.length) return false;
  let result = 0;
  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return result === 0;
};

const verifyDodoWebhookSignature = async (request: Request, body: string, env: Env) => {
  if (!env.DODO_PAYMENTS_WEBHOOK_SECRET) return false;

  const webhookId = request.headers.get('webhook-id') || '';
  const webhookTimestamp = request.headers.get('webhook-timestamp') || '';
  const webhookSignature = request.headers.get('webhook-signature') || '';
  if (!webhookId || !webhookTimestamp || !webhookSignature) return false;

  const timestamp = Number(webhookTimestamp);
  if (!Number.isFinite(timestamp) || Math.abs(Date.now() - timestamp * 1000) > 5 * 60 * 1000) {
    return false;
  }

  const key = await crypto.subtle.importKey(
    'raw',
    encodeUtf8(env.DODO_PAYMENTS_WEBHOOK_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signedPayload = `${webhookId}.${webhookTimestamp}.${body}`;
  const digest = await crypto.subtle.sign('HMAC', key, encodeUtf8(signedPayload));
  const expectedBase64 = toBase64(digest);
  const expectedHex = toHex(digest);
  const providedSignatures = normalizeSignatures(webhookSignature);

  return providedSignatures.some(
    (signature) => constantTimeEqual(signature, expectedBase64) || constantTimeEqual(signature, expectedHex)
  );
};

const getMetadataValue = (metadata: Record<string, unknown> | undefined, key: string) => {
  const value = metadata?.[key];
  return typeof value === 'string' ? value : undefined;
};

const planFromProduct = (productId: string | undefined, env: Env): PlanId | undefined => {
  if (!productId) return undefined;
  return (Object.keys(planProductEnvKeys) as PlanId[]).find((planId) => env[planProductEnvKeys[planId]] === productId);
};

const writeSupabaseRow = async (env: Env, table: string, body: unknown, onConflict?: string) => {
  const supabaseUrl = getSupabaseUrl(env);
  const headers = getSupabaseServiceHeaders(env);
  if (!supabaseUrl || !headers) {
    throw new Error('Supabase service role is not configured.');
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${table}${onConflict ? `?on_conflict=${onConflict}` : ''}`, {
    method: 'POST',
    headers: {
      ...headers,
      Prefer: onConflict ? 'resolution=merge-duplicates,return=representation' : 'return=minimal',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok && response.status !== 409) {
    throw new Error(`Supabase ${table} write failed: ${response.status} ${await response.text()}`);
  }

  return response;
};

const handleDodoWebhook = async (request: Request, env: Env) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, { status: 405 });
  }

  const body = await request.text();
  const isValidSignature = await verifyDodoWebhookSignature(request, body, env);
  if (!isValidSignature) {
    return json({ error: 'Invalid webhook signature.' }, { status: 401 });
  }

  let event: DodoWebhookEvent;
  try {
    event = JSON.parse(body) as DodoWebhookEvent;
  } catch {
    return json({ error: 'Invalid webhook payload.' }, { status: 400 });
  }

  const webhookId = request.headers.get('webhook-id') || `${event.type || 'unknown'}-${event.timestamp || Date.now()}`;
  await writeSupabaseRow(
    env,
    'dodo_webhook_events',
    {
      id: webhookId,
      event_type: event.type || 'unknown',
      payload: event,
      received_at: new Date().toISOString(),
    },
    'id'
  );

  const metadata = event.data?.metadata;
  const userId = getMetadataValue(metadata, 'user_id');
  const email = getMetadataValue(metadata, 'email') || event.data?.customer?.email;
  const productId = event.data?.product_id;
  const planId = getMetadataValue(metadata, 'plan_id') || planFromProduct(productId, env);
  const source = getMetadataValue(metadata, 'source');

  if (!userId || !email || !planId || !allowedPlans.has(planId as PlanId)) {
    return json({ received: true, fulfilled: false, reason: 'Missing user or plan metadata.' });
  }

  const activeEvents = new Set(['payment.succeeded', 'subscription.active', 'subscription.renewed', 'subscription.updated']);
  const cancelledEvents = new Set(['subscription.cancelled']);
  const failedEvents = new Set(['payment.failed', 'subscription.failed', 'subscription.expired']);
  const status = activeEvents.has(event.type || '')
    ? 'active'
    : cancelledEvents.has(event.type || '')
      ? 'cancelled'
      : failedEvents.has(event.type || '')
        ? 'failed'
        : undefined;

  if (!status) {
    return json({ received: true, fulfilled: false, reason: 'Event type does not change access.' });
  }

  await writeSupabaseRow(
    env,
    'premium_entitlements',
    {
      user_id: userId,
      email,
      plan_id: planId,
      status,
      source,
      dodo_customer_id: event.data?.customer?.customer_id || event.data?.customer_id,
      dodo_payment_id: event.data?.payment_id,
      dodo_subscription_id: event.data?.subscription_id,
      product_id: productId,
      current_period_end: event.data?.next_billing_date || event.data?.current_period_end,
      updated_at: new Date().toISOString(),
    },
    'user_id,plan_id'
  );

  return json({ received: true, fulfilled: true });
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

    if (url.pathname === '/api/me') {
      return handleMe(request, env);
    }

    if (url.pathname === '/api/webhooks/dodo') {
      return handleDodoWebhook(request, env);
    }

    return maybeServeHtmlWithSeo(request, env, url.pathname);
  },
};
