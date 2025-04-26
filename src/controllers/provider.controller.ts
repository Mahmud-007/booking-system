import { Request, Response } from "express";
import { ProviderService } from "../services/provider.service";

const providerService = new ProviderService();

export class ProviderController {
  async createProvider(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone, bio, serviceIds } = req.body;

      if (!name || !email) {
        res.status(400).json({ message: "Name and email are required" });
        return;
      }

      const provider = await providerService.createProvider({
        name,
        email,
        phone,
        bio,
        serviceIds,
      });

      res.status(201).json(provider);
    } catch (error) {
      res.status(500).json({ message: "Error creating provider", error });
    }
  }
  async getAllProviders(req: Request, res: Response): Promise<void> {
    try {
      const serviceId = req.query.serviceId
        ? parseInt(req.query.serviceId as string)
        : undefined;

      const providers = await providerService.findAll(serviceId);
      res.status(200).json(providers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching providers", error });
    }
  }

  async getProviderById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid provider ID" });
        return;
      }

      const provider = await providerService.findById(id);

      if (!provider) {
        res.status(404).json({ message: "Provider not found" });
        return;
      }

      res.status(200).json(provider);
    } catch (error) {
      res.status(500).json({ message: "Error fetching provider", error });
    }
  }
}
