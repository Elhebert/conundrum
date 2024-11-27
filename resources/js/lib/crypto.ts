export async function generateKey(password: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();

    return await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        { name: 'PBKDF2' },
        true,
        ['deriveKey'],
    );
}

export async function deriveKey(
    key: CryptoKey,
    salt: Uint8Array,
): Promise<CryptoKey> {
    return await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt,
            iterations: 100000,
            hash: 'SHA-256',
        },
        key,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt'],
    );
}

export async function getKey(
    password: string,
    salt: Uint8Array,
): Promise<CryptoKey> {
    return await deriveKey(await generateKey(password), salt);
}

export function generateRandomPassword(): string {
    return Array.from(
        crypto.getRandomValues(new Uint8Array(16)),
        (v: number): string => v.toString(32).padStart(2, '0'),
    ).join('');
}

export async function encrypt(
    message: string,
    key: CryptoKey,
): Promise<{ ciphertext: ArrayBuffer; iv: Uint8Array<ArrayBuffer> }> {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoder = new TextEncoder();

    const ciphertext = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encoder.encode(message),
    );

    return { ciphertext, iv };
}

export async function decrypt(
    encryptedMessage: ArrayBuffer,
    key: CryptoKey,
    iv: Uint8Array<ArrayBuffer>,
): Promise<string> {
    const decoder = new TextDecoder();
    const decryptedData = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        encryptedMessage,
    );

    return decoder.decode(decryptedData);
}
