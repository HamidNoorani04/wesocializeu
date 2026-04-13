import { Router } from "express";
import { db } from "@workspace/db";
import {
  servicesTable,
  creatorsTable,
  caseStudiesTable,
  blogPostsTable,
  enquiriesTable,
} from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { count } from "drizzle-orm";

const router = Router();

router.get("/stats/dashboard", async (_req, res) => {
  const [
    [{ total: totalServices }],
    [{ total: totalCreators }],
    [{ total: totalCaseStudies }],
    [{ total: totalBlogPosts }],
    [{ total: totalEnquiries }],
    [{ total: newEnquiries }],
    [{ total: publishedPosts }],
    [{ total: featuredCreators }],
  ] = await Promise.all([
    db.select({ total: count() }).from(servicesTable),
    db.select({ total: count() }).from(creatorsTable),
    db.select({ total: count() }).from(caseStudiesTable),
    db.select({ total: count() }).from(blogPostsTable),
    db.select({ total: count() }).from(enquiriesTable),
    db.select({ total: count() }).from(enquiriesTable).where(eq(enquiriesTable.status, "new")),
    db.select({ total: count() }).from(blogPostsTable).where(eq(blogPostsTable.published, true)),
    db.select({ total: count() }).from(creatorsTable).where(eq(creatorsTable.featured, true)),
  ]);

  res.json({
    totalServices,
    totalCreators,
    totalCaseStudies,
    totalBlogPosts,
    totalEnquiries,
    newEnquiries,
    publishedPosts,
    featuredCreators,
  });
});

router.get("/stats/enquiries-by-type", async (_req, res) => {
  const all = await db.select().from(enquiriesTable);
  const counts: Record<string, number> = {};
  for (const e of all) {
    counts[e.type] = (counts[e.type] ?? 0) + 1;
  }
  res.json(Object.entries(counts).map(([type, c]) => ({ type, count: c })));
});

router.get("/stats/recent-enquiries", async (_req, res) => {
  const items = await db
    .select()
    .from(enquiriesTable)
    .orderBy(desc(enquiriesTable.createdAt))
    .limit(5);
  res.json(items);
});

router.get("/stats/featured-creators", async (_req, res) => {
  const items = await db
    .select()
    .from(creatorsTable)
    .where(eq(creatorsTable.featured, true))
    .limit(6);
  res.json(items);
});

router.get("/stats/featured-case-studies", async (_req, res) => {
  const items = await db
    .select()
    .from(caseStudiesTable)
    .where(eq(caseStudiesTable.featured, true))
    .limit(3);
  res.json(items);
});

export default router;
