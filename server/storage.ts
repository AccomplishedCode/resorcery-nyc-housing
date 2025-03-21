import { sites, type Site, type InsertSite, scenarios, type Scenario, type InsertScenario, users, type User, type InsertUser } from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Sites operations
  getAllSites(): Promise<Site[]>;
  getSite(id: number): Promise<Site | undefined>;
  createSite(site: InsertSite): Promise<Site>;
  
  // Scenarios operations
  getScenarios(siteId?: number): Promise<Scenario[]>;
  getScenario(id: number): Promise<Scenario | undefined>;
  createScenario(scenario: InsertScenario): Promise<Scenario>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private sitesData: Map<number, Site>;
  private scenariosData: Map<number, Scenario>;
  private userId: number;
  private siteId: number;
  private scenarioId: number;

  constructor() {
    this.users = new Map();
    this.sitesData = new Map();
    this.scenariosData = new Map();
    this.userId = 1;
    this.siteId = 1;
    this.scenarioId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Sites operations
  async getAllSites(): Promise<Site[]> {
    return Array.from(this.sitesData.values());
  }
  
  async getSite(id: number): Promise<Site | undefined> {
    return this.sitesData.get(id);
  }
  
  async createSite(insertSite: InsertSite): Promise<Site> {
    const id = this.siteId++;
    const site: Site = { ...insertSite, id };
    this.sitesData.set(id, site);
    return site;
  }
  
  // Scenarios operations
  async getScenarios(siteId?: number): Promise<Scenario[]> {
    if (siteId) {
      return Array.from(this.scenariosData.values()).filter(
        (scenario) => scenario.siteId === siteId
      );
    }
    return Array.from(this.scenariosData.values());
  }
  
  async getScenario(id: number): Promise<Scenario | undefined> {
    return this.scenariosData.get(id);
  }
  
  async createScenario(insertScenario: InsertScenario): Promise<Scenario> {
    const id = this.scenarioId++;
    const scenario: Scenario = { ...insertScenario, id };
    this.scenariosData.set(id, scenario);
    return scenario;
  }
  
  // Initialize sample data
  private initializeSampleData() {
    // Add sample sites
    const sampleSites: InsertSite[] = [
      {
        name: "East Village R7A Lot",
        blockNumber: 972,
        lotNumber: 34,
        currentFAR: 1.2,
        allowedFAR: 4.0,
        potentialUnits: 85,
        latitude: 40.726,
        longitude: -73.984,
        zoning: "R7A",
      },
      {
        name: "Williamsburg R6 Lot",
        blockNumber: 2382,
        lotNumber: 17,
        currentFAR: 2.1,
        allowedFAR: 3.6,
        potentialUnits: 64,
        latitude: 40.714,
        longitude: -73.961,
        zoning: "R6",
      },
      {
        name: "Bed-Stuy R7D Lot",
        blockNumber: 1624,
        lotNumber: 48,
        currentFAR: 2.8,
        allowedFAR: 4.2,
        potentialUnits: 42,
        latitude: 40.687,
        longitude: -73.949,
        zoning: "R7D",
      },
    ];
    
    sampleSites.forEach(site => {
      this.createSite(site);
    });
    
    // Add sample scenarios for site 1 (East Village)
    const sampleScenarios: InsertScenario[] = [
      {
        siteId: 1,
        name: "Maximum Density Residential",
        description: "Maximizes total unit count with standard construction",
        unitCount: 85,
        affordablePercentage: 25,
        buildingHeight: 85,
        stories: 8,
        squareFootage: 78500,
        far: 3.9,
        constructionTimeline: 24,
        estimatedCost: 46.2,
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        siteId: 1,
        name: "Mixed-Use with Retail",
        description: "Ground floor commercial with residential above",
        unitCount: 72,
        affordablePercentage: 25,
        buildingHeight: 81,
        stories: 8,
        squareFootage: 78000,
        far: 3.8,
        constructionTimeline: 26,
        estimatedCost: 47.5,
        imageUrl: "https://images.unsplash.com/photo-1577791465485-b80039b4d69a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        siteId: 1,
        name: "Community-Focused",
        description: "Includes childcare center and community space",
        unitCount: 64,
        affordablePercentage: 35,
        buildingHeight: 75,
        stories: 7,
        squareFootage: 74000,
        far: 3.7,
        constructionTimeline: 28,
        estimatedCost: 45.8,
        imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
      {
        siteId: 1,
        name: "Passive House Design",
        description: "High-efficiency sustainable construction",
        unitCount: 78,
        affordablePercentage: 30,
        buildingHeight: 82,
        stories: 8,
        squareFootage: 76000,
        far: 3.8,
        constructionTimeline: 30,
        estimatedCost: 53.0,
        imageUrl: "https://images.unsplash.com/photo-1518353053542-7ea33d942319?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      },
    ];
    
    sampleScenarios.forEach(scenario => {
      this.createScenario(scenario);
    });
  }
}

export const storage = new MemStorage();
