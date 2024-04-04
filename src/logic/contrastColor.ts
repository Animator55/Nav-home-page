export default function contrastColor(hexColor:string) {
    let r = parseInt(hexColor.substring(1, 3), 16);
    let g = parseInt(hexColor.substring(3, 5), 16);
    let b = parseInt(hexColor.substring(5, 7), 16);

    let luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luminosity > 128 ? 'var(--cblack)' : 'var(--cwhite)';
}
