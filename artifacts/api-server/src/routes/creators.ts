import { Router } from "express";
import { db } from "@workspace/db";
import { creatorsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import {
  CreateCreatorBody,
  UpdateCreatorBody,
  GetCreatorParams,
  UpdateCreatorParams,
  DeleteCreatorParams,
  ListCreatorsQueryParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/creators", async (req, res) => {
  const query = ListCreatorsQueryParams.parse(req.query);
  let qb = db.select().from(creatorsTable).$dynamic();
  if (query.featured !== undefined) {
    qb = qb.where(eq(creatorsTable.featured, query.featured));
  }
  const creators = await qb.orderBy(desc(creatorsTable.createdAt));
  if (query.category) {
    return res.json(creators.filter((c) => c.category === query.category));
  }
  res.json(creators);
});

router.post("/creators", async (req, res) => {
  const body = CreateCreatorBody.parse(req.body);
  const [creator] = await db.insert(creatorsTable).values(body).returning();
  res.status(201).json(creator);
});

router.get("/creators/:id", async (req, res) => {
  const { id } = GetCreatorParams.parse({ id: Number(req.params.id) });
  const [creator] = await db.select().from(creatorsTable).where(eq(creatorsTable.id, id));
  if (!creator) return res.status(404).json({ error: "Not found" });
  res.json(creator);
});

router.put("/creators/:id", async (req, res) => {
  const { id } = UpdateCreatorParams.parse({ id: Number(req.params.id) });
  const body = UpdateCreatorBody.parse(req.body);
  const [creator] = await db
    .update(creatorsTable)
    .set(body)
    .where(eq(creatorsTable.id, id))
    .returning();
  if (!creator) return res.status(404).json({ error: "Not found" });
  res.json(creator);
});

router.delete("/creators/:id", async (req, res) => {
  const { id } = DeleteCreatorParams.parse({ id: Number(req.params.id) });
  await db.delete(creatorsTable).where(eq(creatorsTable.id, id));
  res.status(204).send();
});

export default router;
