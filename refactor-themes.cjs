const fs = require('fs');
const path = require('path');

function replaceColors(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace text-white variations with CSS variable counterparts
    const opacityMap = ['20', '30', '40', '50', '60', '70', '80', '90'];

    opacityMap.forEach(op => {
        content = content.replace(new RegExp(`text-white/${op}`, 'g'), `text-[var(--color-text-primary)]/${op}`);
        content = content.replace(new RegExp(`bg-white/${op}`, 'g'), `bg-[var(--color-text-primary)]/${op}`);
        content = content.replace(new RegExp(`border-white/${op}`, 'g'), `border-[var(--color-text-primary)]/${op}`);
        content = content.replace(new RegExp(`stroke-white/${op}`, 'g'), `stroke-[var(--color-text-primary)]/${op}`);
    });

    // Base white replacements AFTER opacities so we don't accidentally match `text-white/50` as `text-white`
    content = content.replace(/\btext-white\b/g, 'text-[var(--color-text-primary)]');
    content = content.replace(/border-white\b/g, 'border-[var(--color-text-primary)]');
    content = content.replace(/stroke="white"/g, 'stroke="var(--color-text-primary)"');
    content = content.replace(/fill="white"/g, 'fill="var(--color-text-primary)"');

    // Specific hardcoded replacements
    content = content.replace(/bg-white\/\[0\.01\]/g, 'bg-[var(--color-text-primary)]/[0.01]');
    content = content.replace(/bg-white\/\[0\.02\]/g, 'bg-[var(--color-text-primary)]/[0.02]');
    content = content.replace(/bg-white\/\[0\.03\]/g, 'bg-[var(--color-text-primary)]/[0.03]');
    content = content.replace(/bg-white\/\[0\.04\]/g, 'bg-[var(--color-text-primary)]/[0.04]');

    // Specific border
    content = content.replace(/border-white\/5\b/g, 'border-[var(--color-text-primary)]/5');
    content = content.replace(/border-white\/10\b/g, 'border-[var(--color-text-primary)]/10');
    content = content.replace(/border-white\/20\b/g, 'border-[var(--color-text-primary)]/20');

    content = content.replace(/bg-white\/5\b/g, 'bg-[var(--color-text-primary)]/5');
    content = content.replace(/bg-white\/10\b/g, 'bg-[var(--color-text-primary)]/10');

    // Global wrapper replacement
    content = content.replace(
        /className="min-h-screen bg-\[#F7F5F0\] text-\[#1C1A17\] selection:bg-\[#C8742E\]\/20"/,
        'className="min-h-screen selection:bg-[var(--color-accent)]/20"'
    );

    fs.writeFileSync(filePath, content);
    console.log(`Refactored ${filePath}`);
}

replaceColors(path.join(__dirname, 'src/MidnightLuxe.jsx'));
replaceColors(path.join(__dirname, 'src/WarmStudio.jsx'));
