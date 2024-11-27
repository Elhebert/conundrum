import { PropsWithChildren } from 'react';

export default function App({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-purple-400">
            <div className="container mx-auto">
                <h1 className="text-center text-5xl font-extrabold leading-loose tracking-wider">
                    Your secret notes creator
                </h1>
                <div className="flex min-h-96 justify-center border-4 border-black bg-green-300 p-8 shadow-black">
                    {children}
                </div>
            </div>
        </div>
    );
}
