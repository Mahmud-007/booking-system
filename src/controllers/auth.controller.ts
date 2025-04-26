import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto } from '../dtos';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const userData: RegisterDto = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      // Basic validation
      if (!userData.name || !userData.email || !userData.password) {
        res.status(400).json({ message: 'Name, email, and password are required' });
        return;
      }
      
      const result = await authService.register(userData);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error && error.message === 'User with this email already exists') {
        res.status(409).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error during registration', error });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const loginData: LoginDto = {
        email: req.body.email,
        password: req.body.password,
      };
      
      // Basic validation
      if (!loginData.email || !loginData.password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
      }
      
      const result = await authService.login(loginData);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error && error.message === 'Invalid email or password') {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error during login', error });
      }
    }
  }
}