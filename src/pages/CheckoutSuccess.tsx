import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, FileText, MessageCircle, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth } from '../auth/AuthProvider';
import { useI18n } from '../i18n';

type MeResponse = {
  premium?: boolean;
  activePlan?: string | null;
  entitlements?: Array<{ plan_id: string; status: string }>;
};

const CheckoutSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { pick } = useI18n();
  const { getAccessToken, session } = useAuth();
  const [fulfillmentStatus, setFulfillmentStatus] = useState<'checking' | 'active' | 'pending' | 'signed-out'>('checking');
  const text = pick({
    en: {
      eyebrow: 'Payment received',
      title: 'Your premium BaZi report is unlocked',
      subtitle: 'Dodo Payments has redirected you back successfully. Keep this page as the post-payment handoff while webhook fulfillment is connected.',
      activeSubtitle: 'Your payment is confirmed and premium access is active on this account.',
      pendingSubtitle: 'Your payment is confirmed. Premium access is still syncing from Dodo Payments and should appear shortly.',
      signedOutSubtitle: 'Your payment is confirmed. Sign in with the same email used at checkout to see premium access.',
      plan: 'Plan',
      status: 'Access status',
      checking: 'Checking access...',
      active: 'Active',
      pending: 'Syncing',
      signedOut: 'Sign in required',
      nextSteps: [
        ['Confirmation email', 'Dodo will send the payment confirmation to the customer email collected at checkout.'],
        ['Report access', 'The next backend step is to fulfill premium access from the Dodo webhook.'],
        ['Support follow-up', 'Users can still return to the reading flow and continue with their chart.'],
      ],
      backToReading: 'Back to Readings',
      viewPlans: 'View Plans',
    },
    'zh-CN': {
      eyebrow: '支付已完成',
      title: '你的高级八字报告已解锁',
      subtitle: 'Dodo Payments 已成功跳回网站。这里先作为支付后的承接页，后续再通过 webhook 自动开通报告权限。',
      activeSubtitle: '支付已确认，此账号的高级权限已开通。',
      pendingSubtitle: '支付已确认。高级权限仍在等待 Dodo Payments webhook 同步，通常会很快完成。',
      signedOutSubtitle: '支付已确认。请用结账时的邮箱登录查看高级权限。',
      plan: '套餐',
      status: '权限状态',
      checking: '正在检查权限...',
      active: '已开通',
      pending: '同步中',
      signedOut: '需要登录',
      nextSteps: [
        ['确认邮件', 'Dodo 会向结账时填写的邮箱发送付款确认。'],
        ['报告权限', '下一步需要通过 Dodo webhook 自动开通高级报告。'],
        ['继续使用', '用户可以返回解读流程，继续查看自己的命盘。'],
      ],
      backToReading: '返回八字解读',
      viewPlans: '查看套餐',
    },
    'zh-TW': {
      eyebrow: '支付已完成',
      title: '你的高級八字報告已解鎖',
      subtitle: 'Dodo Payments 已成功跳回網站。這裡先作為支付後的承接頁，後續再透過 webhook 自動開通報告權限。',
      activeSubtitle: '支付已確認，此帳號的高級權限已開通。',
      pendingSubtitle: '支付已確認。高級權限仍在等待 Dodo Payments webhook 同步，通常會很快完成。',
      signedOutSubtitle: '支付已確認。請用結帳時的信箱登入查看高級權限。',
      plan: '套餐',
      status: '權限狀態',
      checking: '正在檢查權限...',
      active: '已開通',
      pending: '同步中',
      signedOut: '需要登入',
      nextSteps: [
        ['確認郵件', 'Dodo 會向結帳時填寫的信箱發送付款確認。'],
        ['報告權限', '下一步需要透過 Dodo webhook 自動開通高級報告。'],
        ['繼續使用', '使用者可以返回解讀流程，繼續查看自己的命盤。'],
      ],
      backToReading: '返回八字解讀',
      viewPlans: '查看套餐',
    },
  });

  const plan = searchParams.get('plan') || 'premium';

  useEffect(() => {
    let cancelled = false;

    const checkAccess = async () => {
      if (!session) {
        setFulfillmentStatus('signed-out');
        return;
      }

      const accessToken = await getAccessToken();
      if (!accessToken) {
        setFulfillmentStatus('signed-out');
        return;
      }

      const response = await fetch('/api/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (cancelled) return;

      if (!response.ok) {
        setFulfillmentStatus('pending');
        return;
      }

      const data = (await response.json()) as MeResponse;
      setFulfillmentStatus(data.premium ? 'active' : 'pending');
    };

    checkAccess();
    const timer = window.setInterval(checkAccess, 5000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [getAccessToken, session]);

  const subtitle =
    fulfillmentStatus === 'active'
      ? text.activeSubtitle
      : fulfillmentStatus === 'pending'
        ? text.pendingSubtitle
        : fulfillmentStatus === 'signed-out'
          ? text.signedOutSubtitle
          : text.subtitle;

  const statusLabel =
    fulfillmentStatus === 'active'
      ? text.active
      : fulfillmentStatus === 'pending'
        ? text.pending
        : fulfillmentStatus === 'signed-out'
          ? text.signedOut
          : text.checking;

  return (
    <div className="px-4 pb-16 pt-28">
      <SEO
        title="Checkout Success"
        description="Payment confirmation page for premium BaZi report access."
        url="https://fortunetelling.it.com/checkout/success"
        noIndex
      />
      <div className="mx-auto max-w-4xl">
        <section className="glass-panel p-6 text-center md:p-10">
          <div className="glass-inset mx-auto mb-5 flex h-14 w-14 items-center justify-center text-emerald-300">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
            {text.eyebrow}
          </p>
          <h1 className="mb-4 text-3xl font-serif text-white md:text-4xl">{text.title}</h1>
          <p className="mx-auto mb-6 max-w-2xl text-slate-300">{subtitle}</p>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-200">
            <Sparkles className="h-4 w-4" />
            {text.plan}: {plan}
          </div>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
            <CheckCircle2 className="h-4 w-4" />
            {text.status}: {statusLabel}
          </div>

          <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-3">
            {text.nextSteps.map(([title, description], index) => {
              const icons = [
                <CheckCircle2 key="check" className="h-5 w-5 text-emerald-300" />,
                <FileText key="file" className="h-5 w-5 text-amber-300" />,
                <MessageCircle key="message" className="h-5 w-5 text-sky-300" />,
              ];

              return (
                <div key={title} className="glass-card p-5">
                  <div className="glass-inset mb-4 flex h-10 w-10 items-center justify-center">
                    {icons[index]}
                  </div>
                  <h2 className="mb-2 font-semibold text-white">{title}</h2>
                  <p className="text-sm leading-6 text-slate-300">{description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/readings" className="glass-primary-button rounded-lg px-6 py-3 font-semibold">
              {text.backToReading}
            </Link>
            <Link to="/subscription#plans" className="glass-secondary-button rounded-lg px-6 py-3 font-semibold">
              {text.viewPlans}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
