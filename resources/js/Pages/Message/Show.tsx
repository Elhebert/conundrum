import { Button } from '@/Components/ui/Button';
import AppLayout from '@/Layouts/AppLayout';
import { decrypt, getKey } from '@/lib/crypto';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({
    note,
    salt,
    iv,
}: {
    note: string;
    salt: string;
    iv: string;
}) {
    const [password] = useState(atob(window.location.hash.slice(1)));
    const [decryptedNote, setDecryptedNote] = useState<string>();

    const onClick = async function (): Promise<void> {
        const key = await getKey(
            password,
            Uint8Array.from(atob(salt), (c) => c.charCodeAt(0)),
        );

        setDecryptedNote(
            await decrypt(
                Uint8Array.from(atob(note), (c) => c.charCodeAt(0)).buffer,
                key,
                Uint8Array.from(atob(iv), (c) => c.charCodeAt(0)),
            ),
        );
    };

    return (
        <AppLayout>
            <Head title="Create message" />

            <div className="flex w-full max-w-3xl flex-col items-center">
                <h2>View the encrypted note</h2>
                <div className="w-full space-y-6">
                    <div className="min-h-[120px] w-full border-2 border-black bg-white px-3 py-2 shadow-black-small">
                        {decryptedNote ??
                            'Your secret note will be decrypted here...'}
                    </div>

                    {decryptedNote === undefined && (
                        <Button
                            className="bg-yellow-300"
                            type="button"
                            onClick={onClick}
                        >
                            View secret note
                        </Button>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
