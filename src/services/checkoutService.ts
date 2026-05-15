export type CheckoutPlanId = 'essential' | 'pro' | 'annual';

type CreateCheckoutInput = {
  planId: CheckoutPlanId;
  source: string;
  language: string;
  accessToken: string;
};

type CheckoutResponse = {
  checkoutUrl?: string;
  sessionId?: string;
  error?: string;
};

export const createCheckoutSession = async ({
  planId,
  source,
  language,
  accessToken,
}: CreateCheckoutInput): Promise<{ checkoutUrl: string; sessionId?: string }> => {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      planId,
      source,
      language,
      path: window.location.pathname,
    }),
  });

  const data = (await response.json()) as CheckoutResponse;

  if (!response.ok || !data.checkoutUrl) {
    throw new Error(data.error || 'Unable to start checkout.');
  }

  return {
    checkoutUrl: data.checkoutUrl,
    sessionId: data.sessionId,
  };
};
