import type { Config } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { mobileMoney } from "../../db/schema.js";

// Mêmes valeurs publiques que dans index.html (clé "publishable", pas un secret)
const SUPABASE_URL = "https://gnhvvhjnfsetopbekqcp.supabase.co";
const SUPABASE_KEY = "sb_publishable_TTbtSYdZF5PXJIAZiwsAkQ_3CcoAzIw";

// Vérifie le jeton Supabase et renvoie { id, admin } ou null
async function whoami(req: Request) {
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const h = { apikey: SUPABASE_KEY, authorization: `Bearer ${token}` };
  const u = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: h });
  if (!u.ok) return null;
  const { id } = await u.json();
  if (!id) return null;
  const p = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${id}&select=role`, { headers: h });
  const rows = p.ok ? await p.json() : [];
  return { id: String(id), admin: rows[0]?.role === "admin" };
}

const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export default async (req: Request) => {
  const me = await whoami(req);
  if (!me) return Response.json({ error: "Non connecté" }, { status: 401 });
  const url = new URL(req.url);

  if (req.method === "GET") {
    const uid = url.searchParams.get("user_id");
    if (!uid) {
      // Liste complète : réservée aux admins
      if (!me.admin) return Response.json({ error: "Accès refusé" }, { status: 403 });
      return Response.json(await db.select().from(mobileMoney));
    }
    if (uid !== me.id && !me.admin) return Response.json({ error: "Accès refusé" }, { status: 403 });
    const [row] = await db.select().from(mobileMoney).where(eq(mobileMoney.userId, uid));
    return Response.json(row || null);
  }

  if (req.method === "PUT") {
    const body = await req.json().catch(() => ({}));
    const uid = clean(body.user_id || me.id, 64);
    if (uid !== me.id && !me.admin) return Response.json({ error: "Accès refusé" }, { status: 403 });
    const number = clean(body.number, 30);
    if (number && !/^\+?[0-9 ]{6,20}$/.test(number))
      return Response.json({ error: "Numéro invalide (chiffres uniquement, + autorisé)." }, { status: 400 });
    const values = { userId: uid, operator: clean(body.operator, 40), number, holder: clean(body.holder, 80), updatedAt: new Date() };
    const [row] = await db
      .insert(mobileMoney)
      .values(values)
      .onConflictDoUpdate({ target: mobileMoney.userId, set: values })
      .returning();
    return Response.json(row);
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = { path: "/api/mobile-money" };
