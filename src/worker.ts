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

const planProductEnvKeys: Record<PlanId, keyof Env> = {
  essential: 'DODO_PRODUCT_ESSENTIAL',
  pro: 'DODO_PRODUCT_PRO',
  annual: 'DODO_PRODUCT_ANNUAL',
};

const allowedPlans = new Set<PlanId>(['essential', 'pro', 'annual']);

const json = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

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

const handleCheckout = async (request: Request, env: Env) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, { status: 405 });
  }

  if (!env.DODO_PAYMENTS_API_KEY) {
    return json({ error: 'Dodo Payments API key is not configured.' }, { status: 500 });
  }

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
    return_url: `${origin}/checkout/success?plan=${encodeURIComponent(planId)}`,
    cancel_url: `${origin}/subscription?source=checkout-cancelled&plan=${encodeURIComponent(planId)}#plans`,
    metadata: {
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

    return env.ASSETS.fetch(request);
  },
};
