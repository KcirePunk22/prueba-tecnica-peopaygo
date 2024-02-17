const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')
const TailwindAnimate = require('tailwindcss-animate')

module.exports = {
	content: [
		// Rutas de archivos para Tailwind CSS
		'../../node_modules/flowbite-react/lib/**/*.js',
		join(__dirname, '{src,pages,components,app}/**/*.{ts,tsx,html}'),
		...createGlobPatternsForDependencies(__dirname), // Patrones de archivos para dependencias
	],
	theme: {
		extend: {
			colors: {
				// Definiciones de colores extendidos
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
			},
			borderRadius: {
				// Definiciones de bordes redondeados extendidos
				lg: `var(--radius)`,
				md: `calc(var(--radius) - 2px)`,
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				// Definiciones de keyframes extendidos
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
				// Definiciones de animaciones extendidas
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [
		// Plugins adicionales de Tailwind CSS
		TailwindAnimate,
		require('flowbite/plugin'), // Plugin de Flowbite (opcional)
	],
}
