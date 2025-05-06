import { LoginFormData } from './validations';

export async function login(email: string, password: string) {
  return { success: true };
}

export async function signup(name: string, email: string, password: string) {
  return { success: true };
}
