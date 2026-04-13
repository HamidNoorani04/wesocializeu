import { Router } from "express";
import bcrypt from "bcryptjs";
import { db } from "@workspace/db";
import { adminsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { AdminLoginBody } from "@workspace/api-zod";

declare module "express-session" {
  interface SessionData {
    adminId: number;
    adminUsername: string;
  }
}

const router = Router();

router.post("/admin/login", async (req, res) => {
  const body = AdminLoginBody.parse(req.body);
  const [admin] = await db.select().from(adminsTable).where(eq(adminsTable.username, body.username));
  if (!admin) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  const valid = await bcrypt.compare(body.password, admin.passwordHash);
  if (!valid) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  req.session.adminId = admin.id;
  req.session.adminUsername = admin.username;
  res.json({ success: true, message: "Logged in" });
});

router.post("/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, message: "Logged out" });
  });
});

router.get("/admin/me", (req, res) => {
  if (req.session.adminId) {
    return res.json({ authenticated: true, username: req.session.adminUsername });
  }
  res.json({ authenticated: false });
});

export default router;
