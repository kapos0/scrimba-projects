export function requireAuth() {
    if (!req.session.userId) {
        console.log("Access to protected route blocked");
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
}
