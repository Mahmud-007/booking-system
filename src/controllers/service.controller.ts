import { Request, Response } from "express";
import { ServiceService } from "../services/service.service";

const serviceService = new ServiceService();

export class ServiceController {
  async createService(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, price, duration, category } = req.body;

      if (!name || !description || !price || !duration || !category) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }

      const service = await serviceService.createService({
        name,
        description,
        price,
        duration,
        category,
      });

      res.status(201).json(service);
    } catch (error) {
      res.status(500).json({ message: "Error creating service", error });
    }
  }

  async getAllServices(req: Request, res: Response): Promise<void> {
    try {
      const category = req.query.category as string | undefined;
      const services = await serviceService.findAll(category);
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: "Error fetching services", error });
    }
  }

  async getServiceById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid service ID" });
        return;
      }

      const service = await serviceService.findById(id);

      if (!service) {
        res.status(404).json({ message: "Service not found" });
        return;
      }

      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ message: "Error fetching service", error });
    }
  }
}
