import { db } from "@workspace/db";
import {
  servicesTable,
  creatorsTable,
  caseStudiesTable,
  blogPostsTable,
  enquiriesTable,
  adminsTable,
} from "@workspace/db";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database...");

  // Admin user
  const passwordHash = await bcrypt.hash("admin123", 10);
  await db
    .insert(adminsTable)
    .values({ username: "admin", passwordHash })
    .onConflictDoNothing();
  console.log("Admin user seeded");

  // Services
  await db
    .insert(servicesTable)
    .values([
      {
        title: "Influencer Campaign Management",
        slug: "influencer-campaign-management",
        description:
          "End-to-end campaign management connecting brands with the perfect influencers. From strategy to execution, we handle every aspect of your influencer marketing campaign to maximize ROI and brand awareness.",
        shortDescription:
          "Full-service campaign management from strategy to execution.",
        icon: "Megaphone",
        features: JSON.stringify([
          "Campaign strategy & planning",
          "Influencer selection & vetting",
          "Contract negotiation",
          "Content brief creation",
          "Performance tracking & reporting",
        ]),
        order: 1,
      },
      {
        title: "Creator Network Access",
        slug: "creator-network-access",
        description:
          "Tap into our exclusive network of 50,000+ vetted creators across every niche and platform. Our creators deliver authentic content that resonates with their highly engaged audiences.",
        shortDescription:
          "Access 50,000+ vetted creators across all platforms and niches.",
        icon: "Users",
        features: JSON.stringify([
          "50,000+ verified creators",
          "Multi-platform coverage",
          "Niche & micro-influencers",
          "Audience demographic data",
          "Engagement rate analysis",
        ]),
        order: 2,
      },
      {
        title: "Content Strategy & Creation",
        slug: "content-strategy-creation",
        description:
          "Transform your brand narrative into compelling social content. Our creative strategists work alongside top creators to produce content that stops the scroll and drives meaningful engagement.",
        shortDescription:
          "Data-driven content strategy paired with authentic creator storytelling.",
        icon: "PenTool",
        features: JSON.stringify([
          "Brand story development",
          "Platform-specific content planning",
          "Creative direction & briefing",
          "UGC content production",
          "Content repurposing strategy",
        ]),
        order: 3,
      },
      {
        title: "Performance Analytics",
        slug: "performance-analytics",
        description:
          "Real-time analytics and reporting that goes beyond vanity metrics. Track genuine business impact from your influencer campaigns with our proprietary measurement framework.",
        shortDescription:
          "Real-time insights and ROI measurement for every campaign.",
        icon: "BarChart3",
        features: JSON.stringify([
          "Real-time dashboard",
          "ROI tracking & attribution",
          "Audience insight reports",
          "Competitor benchmarking",
          "Custom KPI frameworks",
        ]),
        order: 4,
      },
      {
        title: "Brand Partnership Development",
        slug: "brand-partnership-development",
        description:
          "Build long-term, authentic partnerships between your brand and influential creators. We facilitate relationships that create genuine advocacy and sustained audience growth.",
        shortDescription:
          "Long-term brand ambassador programs that build genuine advocacy.",
        icon: "Handshake",
        features: JSON.stringify([
          "Ambassador program design",
          "Long-term partnership management",
          "Co-creation opportunities",
          "Event & activation integration",
          "Brand alignment scoring",
        ]),
        order: 5,
      },
      {
        title: "Social Commerce Solutions",
        slug: "social-commerce-solutions",
        description:
          "Convert social engagement into sales with our integrated social commerce strategies. From shoppable content to affiliate programs, we turn followers into customers.",
        shortDescription:
          "Convert social influence directly into measurable revenue.",
        icon: "ShoppingBag",
        features: JSON.stringify([
          "Shoppable content creation",
          "Affiliate program management",
          "Product seeding campaigns",
          "Live shopping events",
          "Revenue attribution tracking",
        ]),
        order: 6,
      },
    ])
    .onConflictDoNothing();
  console.log("Services seeded");

  // Creators
  await db
    .insert(creatorsTable)
    .values([
      {
        name: "Aria Chen",
        handle: "@ariavibes",
        category: "Lifestyle",
        bio: "Fashion-forward content creator blending sustainable style with modern aesthetics. Known for her editorial eye and authentic storytelling that resonates with Gen Z and millennials.",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        instagramFollowers: 1200000,
        tiktokFollowers: 3400000,
        youtubeFollowers: 580000,
        engagementRate: 4.8,
        featured: true,
      },
      {
        name: "Marcus Williams",
        handle: "@marcusfitlife",
        category: "Fitness",
        bio: "Certified personal trainer and nutrition coach inspiring millions to embrace a healthier lifestyle. Real, unfiltered fitness content with science-backed advice.",
        imageUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        instagramFollowers: 890000,
        tiktokFollowers: 2100000,
        youtubeFollowers: 1400000,
        engagementRate: 6.2,
        featured: true,
      },
      {
        name: "Sofia Rodriguez",
        handle: "@sofiacooks",
        category: "Food",
        bio: "Michelin-trained chef turned content creator, making gourmet cooking accessible to home cooks worldwide. Recipes tested for taste, simplicity, and Instagram perfection.",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        instagramFollowers: 2300000,
        tiktokFollowers: 5600000,
        youtubeFollowers: 980000,
        engagementRate: 5.1,
        featured: true,
      },
      {
        name: "James Park",
        handle: "@jamestech",
        category: "Technology",
        bio: "Silicon Valley product designer demystifying tech for everyday consumers. Honest reviews, deep dives, and cutting-edge gadget breakdowns with over a decade of industry expertise.",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        instagramFollowers: 450000,
        tiktokFollowers: 1200000,
        youtubeFollowers: 2800000,
        engagementRate: 3.9,
        featured: false,
      },
      {
        name: "Luna Patel",
        handle: "@lunabeauty",
        category: "Beauty",
        bio: "Award-winning makeup artist and skincare enthusiast championing inclusive beauty for all skin tones. Tutorials, product reviews, and industry insider access.",
        imageUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
        instagramFollowers: 3100000,
        tiktokFollowers: 8900000,
        youtubeFollowers: 1700000,
        engagementRate: 7.3,
        featured: false,
      },
      {
        name: "Dylan Torres",
        handle: "@dylantravel",
        category: "Travel",
        bio: "Nomadic photographer and travel journalist exploring the world's hidden gems. Cinematic storytelling that transports audiences to extraordinary destinations.",
        imageUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        instagramFollowers: 1800000,
        tiktokFollowers: 940000,
        youtubeFollowers: 2200000,
        engagementRate: 4.4,
        featured: false,
      },
    ])
    .onConflictDoNothing();
  console.log("Creators seeded");

  // Case Studies
  await db
    .insert(caseStudiesTable)
    .values([
      {
        title: "GlowLab Skincare: 400% ROI in 60 Days",
        client: "GlowLab Skincare",
        industry: "Beauty & Cosmetics",
        summary:
          "A micro-influencer campaign that transformed an indie skincare brand into a sell-out success story, achieving 400% ROI within the first 60 days of launch.",
        challenge:
          "GlowLab had an exceptional product but zero brand recognition in a saturated market. With a limited budget and no existing social presence, they needed to break through noise and drive immediate sales.",
        solution:
          "We assembled a curated network of 85 beauty micro-influencers with highly engaged niche audiences. Instead of chasing follower counts, we prioritized authenticity and audience trust. Each creator received personalized briefs allowing creative freedom within brand guidelines.",
        results:
          "The campaign generated 12M impressions, 890K engagements, and directly attributed $2.4M in sales. The hero product sold out within 3 weeks of launch. GlowLab's Instagram grew from 2,000 to 180,000 followers.",
        imageUrl:
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=500&fit=crop",
        roiPercent: 400,
        reachMillion: 12,
        engagementRate: 7.4,
        featured: true,
      },
      {
        title: "FlexFit App: 2.1M Downloads in Q1",
        client: "FlexFit Technologies",
        industry: "Health & Fitness",
        summary:
          "A performance-focused influencer strategy that propelled FlexFit from regional app to top-10 fitness app globally, delivering 2.1 million downloads in a single quarter.",
        challenge:
          "FlexFit was competing against established players like Peloton and MyFitnessPal with a fraction of the marketing budget. They needed a strategy that could punch above its weight.",
        solution:
          "We identified 12 high-performance fitness creators with authentic training communities and structured a 90-day ambassador program. Each creator integrated FlexFit organically into their training content, demonstrating real-world value rather than scripted promotions.",
        results:
          "The campaign drove 2.1M app downloads, achieving the top-10 fitness app ranking in 23 countries. Average user retention after 30 days was 68%, significantly above the industry average of 25%.",
        imageUrl:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
        roiPercent: 310,
        reachMillion: 28,
        engagementRate: 5.8,
        featured: true,
      },
      {
        title: "Urban Harvest: Sold Out in 48 Hours",
        client: "Urban Harvest Foods",
        industry: "Food & Beverage",
        summary:
          "A food creator campaign that created so much demand for Urban Harvest's new plant-based line that the entire inventory sold out within 48 hours of launch.",
        challenge:
          "Urban Harvest needed to validate their new plant-based product line before committing to full-scale production. The launch needed to generate proof of concept without a massive budget.",
        solution:
          "We partnered with 24 food creators ranging from professional chefs to home cooking enthusiasts. Content was timed for maximum algorithm alignment, with coordinated posting across platforms over a 72-hour launch window.",
        results:
          "48-hour sell-out of 10,000 units. 4.2M views on recipe content within the first week. 340% increase in website traffic. Urban Harvest secured retail distribution with two major grocery chains based on the demonstrated demand.",
        imageUrl:
          "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&h=500&fit=crop",
        roiPercent: 280,
        reachMillion: 4.2,
        engagementRate: 6.1,
        featured: false,
      },
    ])
    .onConflictDoNothing();
  console.log("Case studies seeded");

  // Blog Posts
  await db
    .insert(blogPostsTable)
    .values([
      {
        title: "The Micro-Influencer Revolution: Why Smaller Audiences Drive Bigger Results",
        slug: "micro-influencer-revolution",
        excerpt:
          "The era of chasing follower counts is over. Discover why brands achieving the highest ROI are pivoting to micro-influencers with deeply engaged niche communities.",
        content: `# The Micro-Influencer Revolution

The influencer marketing landscape has undergone a fundamental shift. For years, brands measured success by follower counts — the bigger, the better. Today, the most sophisticated brands are doing the opposite.

## Why Micro Beats Mega

Micro-influencers (typically defined as creators with 10,000-100,000 followers) consistently outperform their mega-influencer counterparts across every meaningful metric. Here's why:

**Trust and authenticity**: Smaller creators maintain closer relationships with their audiences. Their recommendations feel personal, not transactional.

**Engagement rates**: Micro-influencers average 6-8% engagement rates, compared to 1-2% for mega-influencers. That's the difference between a conversation and a broadcast.

**Cost efficiency**: You can activate 10-20 relevant micro-influencers for the cost of a single mega-influencer post, diversifying your reach while increasing authenticity.

## The Data Doesn't Lie

Our internal analysis of 500+ campaigns shows that micro-influencer campaigns consistently deliver 3-5x higher ROI than equivalent spend on mega-influencers.

The key is precision. A fitness micro-influencer with 25,000 dedicated followers who trust their supplement recommendations is worth more to a supplement brand than a celebrity with 5 million passive followers.

## Building a Micro-Influencer Strategy

Success with micro-influencers requires a systematic approach:

1. **Define your audience first**: Know exactly who you're trying to reach before identifying creators.
2. **Prioritize authenticity signals**: Look for creators who already use products in your category.
3. **Brief for brand voice, not scripts**: Give creative freedom within clear guidelines.
4. **Scale what works**: Use initial campaigns to identify your highest performers, then deepen those relationships.

The brands winning at influencer marketing in 2025 aren't the ones with the biggest budgets — they're the ones who understand that in a world saturated with content, trust is the most valuable commodity.`,
        author: "Sarah Mitchell",
        category: "Strategy",
        imageUrl:
          "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=500&fit=crop",
        published: true,
        publishedAt: new Date("2025-03-15"),
      },
      {
        title: "TikTok vs Instagram in 2025: Where Should Your Influencer Budget Go?",
        slug: "tiktok-vs-instagram-2025",
        excerpt:
          "Platform wars are heating up. We analyzed 1,000+ campaigns to reveal exactly where each platform excels — and where brands are wasting money.",
        content: `# TikTok vs Instagram in 2025: The Definitive Brand Guide

Platform selection is one of the most consequential decisions in influencer marketing strategy. Get it wrong and you're pouring budget into channels that won't move your specific needle.

## The Platform Landscape

Both platforms have matured significantly, but they serve fundamentally different purposes in the consumer journey.

**TikTok** has become the discovery engine for the internet. Its algorithm-first approach means content from smaller creators can achieve massive reach overnight. The platform excels at driving awareness and creating cultural moments.

**Instagram** remains the conversion platform. Its visual format, integrated shopping features, and older, higher-purchasing-power demographic make it the preferred channel for brands driving direct action.

## What the Data Shows

Our analysis of 1,000+ campaigns across both platforms reveals:

- TikTok drives 3.2x more organic reach per post
- Instagram generates 2.1x higher direct conversion rates
- TikTok creators see 4.7x higher video completion rates
- Instagram Stories deliver 1.8x higher swipe-up rates for product links

## The Strategic Framework

The question isn't which platform is better — it's which is right for your specific objective:

**Choose TikTok when:**
- You're launching a new brand or product
- Your target demographic skews 18-34
- Brand awareness is your primary KPI
- You have strong creative resources for video

**Choose Instagram when:**
- You're driving direct sales or app downloads
- Your target demographic is 25-45+
- You need detailed analytics and attribution
- Long-form storytelling matters to your brand

**The winning approach**: Use TikTok for top-of-funnel awareness, Instagram for conversion. Our highest-performing campaigns use both platforms with coordinated creator strategies.`,
        author: "David Kim",
        category: "Platform Insights",
        imageUrl:
          "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=500&fit=crop",
        published: true,
        publishedAt: new Date("2025-02-28"),
      },
      {
        title: "Measuring What Matters: A Framework for Influencer Campaign ROI",
        slug: "measuring-influencer-campaign-roi",
        excerpt:
          "Vanity metrics are killing influencer marketing budgets. Here's the measurement framework that connects social activity to actual business outcomes.",
        content: `# Measuring What Matters: Influencer Campaign ROI

The influencer marketing industry has a measurement problem. Too many brands are optimizing for likes and views while their finance teams ask harder questions about revenue impact.

## The Vanity Metrics Trap

Reach, impressions, and follower growth feel good to report, but they don't pay bills. We've seen brands celebrate campaigns that generated millions of impressions while failing to move any meaningful business metric.

The problem isn't the campaigns — it's the measurement framework.

## A Better Framework

Effective ROI measurement for influencer marketing operates across three tiers:

### Tier 1: Activity Metrics
These confirm the campaign executed as planned:
- Content delivered vs. contracted
- Reach and impressions
- Engagement rate (normalized by platform)

### Tier 2: Audience Metrics
These measure whether the campaign reached the right people:
- Audience quality score
- Comment sentiment analysis
- Brand mention uplift

### Tier 3: Business Metrics
These connect the campaign to actual outcomes:
- Attributed website traffic (UTM parameters)
- Promo code redemptions
- Direct app downloads or sign-ups
- Sales lift during and after campaign

## Setting Up for Success

Measurement begins before the campaign launches. Every campaign should have:

1. **Clear KPIs tied to business objectives** — not vanity metrics
2. **Proper attribution infrastructure** — UTMs, promo codes, pixel tracking
3. **Baseline measurements** — where were you before?
4. **Statistical significance planning** — how big does the effect need to be to matter?

The brands that are growing their influencer budgets year-over-year are the ones who can show a clear line from creator content to business results. That's the standard worth building toward.`,
        author: "Rachel Torres",
        category: "Analytics",
        imageUrl:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
        published: true,
        publishedAt: new Date("2025-01-20"),
      },
    ])
    .onConflictDoNothing();
  console.log("Blog posts seeded");

  // Enquiries
  await db
    .insert(enquiriesTable)
    .values([
      {
        type: "contact",
        name: "Emma Johnson",
        email: "emma.johnson@techstartup.io",
        company: "TechStartup Inc",
        message:
          "We're launching a new B2C SaaS product and looking to build brand awareness through influencer marketing. Would love to discuss how WeSocializeU could help us reach tech-savvy millennials.",
        budget: "$10,000 - $25,000",
        status: "new",
      },
      {
        type: "brand",
        name: "Michael Chen",
        email: "m.chen@organicfoods.com",
        company: "Pure Harvest Organics",
        message:
          "We run an organic food brand and are interested in partnering with food and lifestyle influencers for our summer campaign. We've had success with influencer marketing before and are looking to scale.",
        budget: "$25,000 - $50,000",
        status: "in_progress",
      },
      {
        type: "creator",
        name: "Jasmine Williams",
        email: "jasmine@beautycreator.com",
        company: null,
        message:
          "I'm a beauty and skincare creator with 180K Instagram followers and 450K TikTok followers. My engagement rate consistently runs above 6% and I focus on sustainable, clean beauty. Looking to work with brands aligned with these values.",
        platform: "Instagram, TikTok",
        followersCount: "180K Instagram, 450K TikTok",
        status: "new",
      },
    ])
    .onConflictDoNothing();
  console.log("Enquiries seeded");

  console.log("Database seeded successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
