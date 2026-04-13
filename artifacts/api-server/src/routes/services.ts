import { Router } from "express";
import { db } from "@workspace/db";
import { servicesTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import {
  CreateServiceBody,
  UpdateServiceBody,
  GetServiceParams,
  UpdateServiceParams,
  DeleteServiceParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/services", async (req, res) => {
  const services = await db
    .select()
    .from(servicesTable)
    .orderBy(asc(servicesTable.order));
  const formatted = services.map((s) => ({
    ...s,
    features: JSON.parse(s.features) as string[],
  }));
  res.json(formatted);
});

router.post("/services", async (req, res) => {
  const body = CreateServiceBody.parse(req.body);
  const [service] = await db
    .insert(servicesTable)
    .values({
      ...body,
      features: JSON.stringify(body.features),
      order: body.order ?? 0,
    })
    .returning();
  res.status(201).json({ ...service, features: JSON.parse(service.features) as string[] });
});

router.get("/services/:id", async (req, res) => {
  const { id } = GetServiceParams.parse({ id: Number(req.params.id) });
  const [service] = await db.select().from(servicesTable).where(eq(servicesTable.id, id));
  if (!service) return res.status(404).json({ error: "Not found" });
  res.json({ ...service, features: JSON.parse(service.features) as string[] });
});

router.put("/services/:id", async (req, res) => {
  const { id } = UpdateServiceParams.parse({ id: Number(req.params.id) });
  const body = UpdateServiceBody.parse(req.body);
  const [service] = await db
    .update(servicesTable)
    .set({ ...body, features: JSON.stringify(body.features), order: body.order ?? 0 })
    .where(eq(servicesTable.id, id))
    .returning();
  if (!service) return res.status(404).json({ error: "Not found" });
  res.json({ ...service, features: JSON.parse(service.features) as string[] });
});

router.delete("/services/:id", async (req, res) => {
  const { id } = DeleteServiceParams.parse({ id: Number(req.params.id) });
  await db.delete(servicesTable).where(eq(servicesTable.id, id));
  res.status(204).send();
});

export default router;
