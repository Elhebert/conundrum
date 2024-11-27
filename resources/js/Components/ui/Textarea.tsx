import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                'focus-visible:ring-ring flex min-h-[120px] w-full border-2 border-black px-3 py-2 shadow-black-small focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:bg-opacity-90',
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = 'Textarea';

export { Textarea };
