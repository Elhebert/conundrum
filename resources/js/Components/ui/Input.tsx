import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
    ({ className, ...props }, ref) => {
        return (
            <input
                className={cn(
                    'focus-visible:ring-ring w-full border-2 border-black px-3 py-2 shadow-black-small focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:bg-opacity-90',
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Input.displayName = 'Input';

export { Input };
