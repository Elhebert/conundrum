import { Button } from '@/Components/ui/Button';
import { Input } from '@/Components/ui/Input';
import { Textarea } from '@/Components/ui/Textarea';
import AppLayout from '@/Layouts/AppLayout';
import { encrypt, generateRandomPassword, getKey } from '@/lib/crypto';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function Create({ link }: { link?: string }) {
    const [password, setPassword] = useState<string>(generateRandomPassword());
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const { data, setData, processing } = useForm<{ message: string }>();

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        const salt = crypto.getRandomValues(new Uint8Array(12));
        const key = await getKey(password, salt);
        const encryptedMessage = await encrypt(data.message, key);

        const base64IV = btoa(String.fromCharCode(...encryptedMessage.iv));
        const base64Message = btoa(
            String.fromCharCode(...new Uint8Array(encryptedMessage.ciphertext)),
        );
        const base64Salt = btoa(String.fromCharCode(...salt));

        router.post(route('note.store'), {
            note: base64Message,
            iv: base64IV,
            salt: base64Salt,
            valid_until: new Date(
                Date.now() + 24 * 60 * 60 * 1000,
            ).toUTCString(),
        });
    };

    const copyToClipboard = async (linkToCopy: string) => {
        await navigator.clipboard.writeText(linkToCopy);
        setIsCopied(true);
        window.setTimeout(() => setIsCopied(false), 1000);
    };

    return (
        <AppLayout>
            <Head title="Create message" />

            <div className="flex w-full max-w-3xl flex-col items-center">
                <h2>Create a new encrypted note</h2>
                <form onSubmit={submit} className="w-full space-y-6">
                    {link && (
                        <>
                            <div className="overflow-hidden text-ellipsis whitespace-nowrap border-2 border-black bg-white px-3 py-2 shadow-black-small transition duration-150 ease-in-out hover:-translate-x-1 hover:-translate-y-[.2rem] hover:shadow-black-small-raised">
                                <span className="text-lg font-bold">
                                    Your link
                                </span>
                                :{' '}
                                <a
                                    href={link + `#${btoa(password)}`}
                                    target="_BLANK"
                                    rel="noreferrer"
                                >
                                    {link + `#${btoa(password)}`}
                                </a>
                            </div>

                            <Button
                                className="bg-yellow-300"
                                type="button"
                                onClick={() =>
                                    copyToClipboard(link + `#${btoa(password)}`)
                                }
                            >
                                {isCopied
                                    ? 'Copied to clipboard ✅'
                                    : 'Copy link'}
                            </Button>
                        </>
                    )}

                    {link === undefined && (
                        <>
                            <Textarea
                                id="name"
                                required
                                onChange={(e) =>
                                    setData('message', e.target.value)
                                }
                                autoFocus
                                placeholder="Type your secret note here..."
                            />
                            <Button
                                className="bg-yellow-300"
                                disabled={processing}
                            >
                                Create secret note
                            </Button>
                        </>
                    )}

                    <div className="space-y-4">
                        <hr className="mt-16 border-2 border-black" />
                        <h3 className="text-lg font-extrabold">
                            Advanced settings
                        </h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-4">
                                <div className="font-extrabold">Password</div>
                                <div className="flex-grow">
                                    <Input
                                        type="text"
                                        id="password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        value={password}
                                        disabled={link !== undefined}
                                    />
                                </div>
                                <Button
                                    className="bg-white"
                                    type="button"
                                    disabled={link !== undefined}
                                    onClick={() =>
                                        setPassword(generateRandomPassword())
                                    }
                                >
                                    Regenerate
                                </Button>
                            </div>
                            <div>
                                The password is automatically added to the hash
                                part of the URL. Unless you remove it, you don't
                                need to worry about the remembering the
                                password. If you remove the hash part of the
                                link and lose this password, the note's content
                                will be lost forever.
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
