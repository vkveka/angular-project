// src/app/services/theme.service.ts
import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';
const THEME_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    getTheme(): Theme {
        const stored = localStorage.getItem(THEME_KEY) as Theme | null;
        if (stored === 'dark' || stored === 'light') return stored;
        const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }

    setTheme(theme: Theme) {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem(THEME_KEY, theme);
        const bg = document.documentElement.querySelectorAll('.bg-gray-800, .bg-gray-300');
        const text = document.documentElement.querySelectorAll('.text-gray-300, .text-gray-500');
        const textHover = document.querySelectorAll('.hover\\:text-gray-300, .hover\\:text-gray-800');

        bg.forEach(el => {
            el.classList.toggle('bg-gray-300', theme === 'dark');
            el.classList.toggle('bg-gray-800', theme !== 'dark');
        });
        text.forEach(el => {
            el.classList.toggle('text-gray-500', theme === 'dark');
            el.classList.toggle('text-gray-300', theme !== 'dark');
        });
        textHover.forEach(el => {
            el.classList.toggle('text-gray-500', theme === 'dark');
            el.classList.toggle('text-gray-300', theme !== 'dark');
        });
    }

    toggle(): Theme {
        const next: Theme = this.getTheme() === 'light' ? 'dark' : 'light';
        this.setTheme(next);
        return next; // ⬅️ utile pour ton composant
    }
}
