import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginDto, RegisterDto } from "../dtos";

const prisma = new PrismaClient();

export class AuthService {
  async register(
    userData: RegisterDto
  ): Promise<{ user: User; token: string }> {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = this.generateToken(user);

    // Return user (without password) and token
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword as User, token };
  }

  async login(loginData: LoginDto): Promise<{ user: User; token: string }> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: loginData.email },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = this.generateToken(user);

    // Return user (without password) and token
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword as User, token };
  }

  private generateToken(user: User): string {
    const jwtSecret = process.env.JWT_SECRET as string;

    return jwt.sign({ userId: user.id, email: user.email }, jwtSecret, {
      expiresIn: "24h",
    });
  }
}
