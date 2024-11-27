import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],
    theme: {
        extend: {
            boxShadow: {
                "black-small": "2px 3px 0 0 rgba(0, 0, 0, 1)",
                "black-small-raised": "6px 6px 0 0 rgba(0, 0, 0, 1)",
                black: "4px 6px 0 0 rgba(0, 0, 0, 1)",
                "black-raised": "10px 10px 0 0 rgba(0, 0, 0, 1)",
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans]
            },
        },
    },
};
