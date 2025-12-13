type EventParams = Record<string, string | number | boolean>;

class AnalyticsService {
    private static instance: AnalyticsService;
    private isDev = import.meta.env.DEV;

    private constructor() { }

    public static getInstance(): AnalyticsService {
        if (!AnalyticsService.instance) {
            AnalyticsService.instance = new AnalyticsService();
        }
        return AnalyticsService.instance;
    }

    public trackEvent(eventName: string, params?: EventParams) {
        if (this.isDev) {
            console.log(`[Analytics] Track: ${eventName}`, params);
        }
        // In production, this would send data to GA4, Mixpanel, etc.
        // window.gtag('event', eventName, params);
    }

    public trackView(viewName: string) {
        this.trackEvent('page_view', { page: viewName });
    }

    public trackLeadGen(type: 'list' | 'report', status: 'start' | 'success' | 'fail') {
        this.trackEvent('lead_generation', { type, status });
    }

    public trackAffiliateClick(partner: string, position: string) {
        this.trackEvent('affiliate_click', { partner, position });
    }
}

export const analytics = AnalyticsService.getInstance();
