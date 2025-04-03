import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
// Removed initializeTheme since we want to force light mode
// import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'CacaoTalk - Filipino to English Translator';

// Force light mode by ensuring the 'dark' class is not present
document.documentElement.classList.remove('dark');

// Add favicon and meta tags
const updateHeadTags = () => {
    // Set favicon
    const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
    favicon.setAttribute('rel', 'icon');
    favicon.setAttribute('href', '/images/cacaotalk.png');
    favicon.setAttribute('type', 'image/png');
    document.head.appendChild(favicon);

    // Set Apple touch icon
    const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') || document.createElement('link');
    appleTouchIcon.setAttribute('rel', 'apple-touch-icon');
    appleTouchIcon.setAttribute('href', '/images/cacaotalk.png');
    document.head.appendChild(appleTouchIcon);

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 'Break language barriers with CacaoTalk, the cutting-edge Filipino to English translator powered by AI.');
    document.head.appendChild(metaDescription);

    // Set meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'Filipino, English, translation, translator, AI, language, Tagalog');
    document.head.appendChild(metaKeywords);

    // Set Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', appName);
    document.head.appendChild(ogTitle);

    const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.setAttribute('content', 'Break language barriers with CacaoTalk, the cutting-edge Filipino to English translator powered by AI.');
    document.head.appendChild(ogDescription);

    const ogType = document.querySelector('meta[property="og:type"]') || document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.setAttribute('content', 'website');
    document.head.appendChild(ogType);

    // Set Open Graph image
    const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    ogImage.setAttribute('content', window.location.origin + '/images/cacaotalk.png');
    document.head.appendChild(ogImage);

    // Set Twitter card meta tags
    const twitterCard = document.querySelector('meta[name="twitter:card"]') || document.createElement('meta');
    twitterCard.setAttribute('name', 'twitter:card');
    twitterCard.setAttribute('content', 'summary_large_image');
    document.head.appendChild(twitterCard);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]') || document.createElement('meta');
    twitterTitle.setAttribute('name', 'twitter:title');
    twitterTitle.setAttribute('content', appName);
    document.head.appendChild(twitterTitle);

    const twitterDescription = document.querySelector('meta[name="twitter:description"]') || document.createElement('meta');
    twitterDescription.setAttribute('name', 'twitter:description');
    twitterDescription.setAttribute(
        'content',
        'Break language barriers with CacaoTalk, the cutting-edge Filipino to English translator powered by AI.',
    );
    document.head.appendChild(twitterDescription);

    // Set Twitter image
    const twitterImage = document.querySelector('meta[name="twitter:image"]') || document.createElement('meta');
    twitterImage.setAttribute('name', 'twitter:image');
    twitterImage.setAttribute('content', window.location.origin + '/images/cacaotalk.png');
    document.head.appendChild(twitterImage);
};

// Call the function to update head tags
updateHeadTags();

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name: string) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }: { el: HTMLElement; App: any; props: any }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// Removed initializeTheme() call to prevent overriding our forced white mode
// initializeTheme();
