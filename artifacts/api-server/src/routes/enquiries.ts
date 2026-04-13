import { Router } from "express";
import { db } from "@workspace/db";
import { enquiriesTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import {
  SubmitEnquiryBody,
  UpdateEnquiryBody,
  GetEnquiryParams,
  UpdateEnquiryParams,
  DeleteEnquiryParams,
  ListEnquiriesQueryParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/enquiries", async (req, res) => {
  const query = ListEnquiriesQueryParams.parse(req.query);
  let items = await db.select().from(enquiriesTable).orderBy(desc(enquiriesTable.createdAt));
  if (query.type) items = items.filter((e) => e.type === query.type);
  if (query.status) items = items.filter((e) => e.status === query.status);
  res.json(items);
});

router.post("/enquiries", async (req, res) => {
  const body = SubmitEnquiryBody.parse(req.body);
  const [enquiry] = await db.insert(enquiriesTable).values({
    ...body,
    status: "new",
  }).returning();
  res.status(201).json(enquiry);
});

router.get("/enquiries/:id", async (req, res) => {
  const { id } = GetEnquiryParams.parse({ id: Number(req.params.id) });
  const [enquiry] = await db.select().from(enquiriesTable).where(eq(enquiriesTable.id, id));
  if (!enquiry) return res.status(404).json({ error: "Not found" });
  res.json(enquiry);
});

router.put("/enquiries/:id", async (req, res) => {
  const { id } = UpdateEnquiryParams.parse({ id: Number(req.params.id) });
  const body = UpdateEnquiryBody.parse(req.body);
  const [enquiry] = await db
    .update(enquiriesTable)
    .set(body)
    .where(eq(enquiriesTable.id, id))
    .returning();
  if (!enquiry) return res.status(404).json({ error: "Not found" });
  res.json(enquiry);
});

router.delete("/enquiries/:id", async (req, res) => {
  const { id } = DeleteEnquiryParams.parse({ id: Number(req.params.id) });
  await db.delete(enquiriesTable).where(eq(enquiriesTable.id, id));
  res.status(204).send();
});

export default router;
