export interface SessionUser {
  id: string;
  email: string;
  name?: string | null;
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  // Production hook point: wire this to Supabase Auth, Auth.js, or your identity provider.
  // Guest mode remains localStorage-driven in the client until the user authenticates.
  return null;
}
