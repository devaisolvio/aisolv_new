import fs from 'fs';

const files = [
    'src/MidnightLuxe.jsx',
    'src/WarmStudio.jsx'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // Replace primary button colors
        content = content.replace(/bg-\[#C8742E\]/g, 'bg-[var(--color-accent)]');
        content = content.replace(/hover:bg-\[#D48C46\]/g, 'hover:bg-[var(--color-accent-hover)]');
        content = content.replace(/shadow-\[#C8742E\]\/20/g, 'shadow-[var(--color-accent-glow)]');

        // Replace outline/ghost colors
        content = content.replace(/border-\[#2A2723\]\/20/g, 'border-[var(--color-text-primary)]\\/20');
        content = content.replace(/text-\[#2A2723\]/g, 'text-[var(--color-text-primary)]');
        content = content.replace(/hover:border-\[#2A2723\]/g, 'hover:border-[var(--color-text-primary)]');
        content = content.replace(/hover:bg-\[#2A2723\]\/5/g, 'hover:bg-[var(--color-text-primary)]\\/5');

        // Replace gold gradients
        content = content.replace(/from-\[#D4AF37\]/g, 'from-[var(--color-accent)]');
        content = content.replace(/to-\[#8A7223\]/g, 'to-[var(--color-accent-hover)]');

        // Replace fixed rgb/rgba glows
        content = content.replace(/rgba\(212,175,55,\s?0\.\d+\)/g, 'var(--color-accent-glow)');
        content = content.replace(/rgba\(212,\s?175,\s?55,\s?0\.\d+\)/g, 'var(--color-accent-glow)');
        content = content.replace(/rgba\(255,255,255,0\.1\)/g, 'var(--color-border-highlight)');

        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
