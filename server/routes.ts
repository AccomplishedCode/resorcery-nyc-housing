import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for Mapbox token
  app.get("/api/mapbox-token", (req, res) => {
    res.json({ token: process.env.MAPBOX_ACCESS_TOKEN });
  });

  // API routes for NYC Housing Department mock data
  app.get("/api/sites", async (req, res) => {
    const sites = await storage.getAllSites();
    res.json(sites);
  });

  app.get("/api/sites/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const site = await storage.getSite(id);
    if (!site) {
      return res.status(404).json({ message: "Site not found" });
    }
    res.json(site);
  });

  app.get("/api/scenarios", async (req, res) => {
    const siteId = req.query.siteId ? parseInt(req.query.siteId as string) : undefined;
    const scenarios = await storage.getScenarios(siteId);
    res.json(scenarios);
  });

  app.get("/api/scenarios/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const scenario = await storage.getScenario(id);
    if (!scenario) {
      return res.status(404).json({ message: "Scenario not found" });
    }
    res.json(scenario);
  });

  const httpServer = createServer(app);
  return httpServer;
}
