import { Router } from "express";
import { db } from "@workspace/db";
import { caseStudiesTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import {
  CreateCaseStudyBody,
  UpdateCaseStudyBody,
  GetCaseStudyParams,
  UpdateCaseStudyParams,
  DeleteCaseStudyParams,
  ListCaseStudiesQueryParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/case-studies", async (req, res) => {
  const query = ListCaseStudiesQueryParams.parse(req.query);
  let qb = db.select().from(caseStudiesTable).$dynamic();
  if (query.featured !== undefined) {
    qb = qb.where(eq(caseStudiesTable.featured, query.featured));
  }
  const items = await qb.orderBy(desc(caseStudiesTable.createdAt));
  res.json(items);
});

router.post("/case-studies", async (req, res) => {
  const body = CreateCaseStudyBody.parse(req.body);
  const [item] = await db.insert(caseStudiesTable).values(body).returning();
  res.status(201).json(item);
});

router.get("/case-studies/:id", async (req, res) => {
  const { id } = GetCaseStudyParams.parse({ id: Number(req.params.id) });
  const [item] = await db.select().from(caseStudiesTable).where(eq(caseStudiesTable.id, id));
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.put("/case-studies/:id", async (req, res) => {
  const { id } = UpdateCaseStudyParams.parse({ id: Number(req.params.id) });
  const body = UpdateCaseStudyBody.parse(req.body);
  const [item] = await db
    .update(caseStudiesTable)
    .set(body)
    .where(eq(caseStudiesTable.id, id))
    .returning();
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.delete("/case-studies/:id", async (req, res) => {
  const { id } = DeleteCaseStudyParams.parse({ id: Number(req.params.id) });
  await db.delete(caseStudiesTable).where(eq(caseStudiesTable.id, id));
  res.status(204).send();
});

export default router;
