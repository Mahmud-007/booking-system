// Auth DTOs
export interface LoginDto {
    email: string;
    password: string;
  }
  
  export interface RegisterDto {
    name: string;
    email: string;
    password: string;
  }
  
  // Service DTOs
  export interface ServiceDto {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    category: string;
    providers?: ProviderDto[];
  }
  
  // Provider DTOs
  export interface ProviderDto {
    id: number;
    name: string;
    email: string;
    phone?: string;
    bio?: string;
    services?: ServiceDto[];
  }
  
  // Booking DTOs
  export interface CreateBookingDto {
    serviceId: number;
    providerId: number;
    date: Date;
  }
  
  export interface BookingDto {
    id: number;
    userId: number;
    serviceId: number;
    providerId: number;
    date: Date;
    status: string;
    service?: ServiceDto;
    provider?: ProviderDto;
  }