import { Router } from "express";
import { db } from "@workspace/db";
import { blogPostsTable } from "@workspace/db";
import { eq, desc, and } from "drizzle-orm";
import {
  CreateBlogPostBody,
  UpdateBlogPostBody,
  GetBlogPostParams,
  UpdateBlogPostParams,
  DeleteBlogPostParams,
  ListBlogPostsQueryParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/blog", async (req, res) => {
  const query = ListBlogPostsQueryParams.parse(req.query);
  let posts = await db.select().from(blogPostsTable).orderBy(desc(blogPostsTable.createdAt));
  if (query.published !== undefined) {
    posts = posts.filter((p) => p.published === query.published);
  }
  if (query.category) {
    posts = posts.filter((p) => p.category === query.category);
  }
  res.json(posts);
});

router.post("/blog", async (req, res) => {
  const body = CreateBlogPostBody.parse(req.body);
  const [post] = await db.insert(blogPostsTable).values({
    ...body,
    publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
  }).returning();
  res.status(201).json(post);
});

router.get("/blog/:id", async (req, res) => {
  const { id } = GetBlogPostParams.parse({ id: Number(req.params.id) });
  const [post] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.id, id));
  if (!post) return res.status(404).json({ error: "Not found" });
  res.json(post);
});

router.put("/blog/:id", async (req, res) => {
  const { id } = UpdateBlogPostParams.parse({ id: Number(req.params.id) });
  const body = UpdateBlogPostBody.parse(req.body);
  const [post] = await db
    .update(blogPostsTable)
    .set({ ...body, publishedAt: body.publishedAt ? new Date(body.publishedAt) : null })
    .where(eq(blogPostsTable.id, id))
    .returning();
  if (!post) return res.status(404).json({ error: "Not found" });
  res.json(post);
});

router.delete("/blog/:id", async (req, res) => {
  const { id } = DeleteBlogPostParams.parse({ id: Number(req.params.id) });
  await db.delete(blogPostsTable).where(eq(blogPostsTable.id, id));
  res.status(204).send();
});

export default router;
