/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit', // calc를 사용할 수 있게 만들어준다.
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
        './public/index.html',
    ],
    safelist: [
        'bg-success-400',
        'bg-warning-400',
        'bg-error-400',
        'fill-success-400',
        'fill-warning-400',
        'fill-error-400',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            backgroundImage: {
                'grass-pattern': "url('@/assets/images/grassBG.svg')",
            },
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                error: {
                    300: 'hsl(var(--error300))',
                    400: 'hsl(var(--error400))',
                    500: 'hsl(var(--error500))',
                },
                success: {
                    300: 'hsl(var(--success300))',
                    400: 'hsl(var(--success400))',
                    500: 'hsl(var(--success500))',
                },
                warning: {
                    300: 'hsl(var(--warning300))',
                    400: 'hsl(var(--warning400))',
                    500: 'hsl(var(--warning500))',
                },
                neutral: {
                    300: 'hsl(var(--neutral300))',
                    400: 'hsl(var(--neutral400))',
                    500: 'hsl(var(--neutral500))',
                },
                text: {
                    black: 'hsl(var(--black))',
                    nileBlue: 'hsl(var(--nileBlue))',
                    ming: 'hsl(var(--ming))',
                },
                brand: {
                    300: 'hsl(var(--brand300))',
                    400: 'hsl(var(--brand400))',
                    500: 'hsl(var(--brand500))',
                },
                animation: {
                    bounce: 'bounce 1s infinite', // 'bounce'는 @keyframes의 이름, 1s는 지속 시간, infinite는 무한 반복을 의미
                },
            },
            fontFamily: {
                pretendardRegular: ['Pretendard-Regular'], // Adds a new `font-display` class
                pretendardBold: ['Pretendard-Bold'],
                ygJalnan: ['yg-jalnan'],
                pretendardBlack: ['Pretendard-Black', 'sans-serif'],
                gmarketSansRegular: ['GmarketSansMedium'],
                gmarketSansBold: ['GmarketSansBold'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            scale: {
                92: '.92',
                98: '.98',
            },
            // // 확장 설정
            // utilities: {
            //     '.snap-y': {
            //         scrollSnapType: 'y mandatory  ',
            //     },
            //     '.snap-start': {
            //         scrollSnapAlign: 'start',
            //     },
            // },
        },
    },
};
