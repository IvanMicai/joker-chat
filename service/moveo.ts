import crypto from "crypto";
const verifyToken = process.env.MOVEO_WEBHOOK_VERIFY_TOKEN

const encodeHMAC = (data: crypto.BinaryLike, secret: string): string  => {
    return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

export const validateSignature = (data: string, signature: string | null): boolean => {
    if (verifyToken == null) return false
    if (signature == null) return false
    
    const hmac = encodeHMAC(data, verifyToken)

    return hmac == signature
}
