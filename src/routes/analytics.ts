import { Router } from "express";
import { firestore } from "../firebase/admin";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

// GET /api/analytics/product-status
router.get("/product-status", requireAuth, async (req, res) => {
  try {
    const productsSnap = await firestore.collection("products").get();
    const counts: Record<string, number> = {};
    productsSnap.forEach(doc => {
      const data = doc.data();
      const status = (data.status as string) || "unknown";
      counts[status] = (counts[status] || 0) + 1;
    });
    return res.json({ counts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
