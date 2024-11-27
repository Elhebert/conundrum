import { cn } from '@/lib/utils';
import * as React from 'react';

const Button = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<'button'>
>(({ className, ...props }, ref) => {
    return (
        <button
            className={cn(
                'rounded-lg border-2 border-black px-3 py-2 shadow-black transition duration-150 ease-in-out hover:-translate-x-1.5 hover:-translate-y-1 hover:shadow-black-raised disabled:cursor-not-allowed disabled:bg-opacity-90 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-black',
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});

Button.displayName = 'Button';

export { Button };
