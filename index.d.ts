export function generateToken(key?: string): { token: string, secret: string }

export function generateQRCode(user: string, service: string, secret: string): string

export function validate(secret: string, token: string): boolean
