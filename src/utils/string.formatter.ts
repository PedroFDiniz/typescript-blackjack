export function pad(text: string, size: number = 1, symbol: string = " "): string {
    if (size < 1) throw Error("Invalid pad size");
    return `${symbol.repeat(size)}${text}${symbol.repeat(size)}`;
}

export function padLeft(text: string, size: number = 1, symbol: string = " "): string {
    if (size < 1) throw Error("Invalid pad size");
    return `${symbol.repeat(size)}${text}`;
}

export function padRight(text: string, size: number = 1, symbol: string = " "): string {
    if (size < 1) throw Error("Invalid pad size");
    return `${text}${symbol.repeat(size)}`;
}

export function capitalize(text: string): string {
    if (!text) return text;
    return (text[0].toUpperCase() + text.substring(1));
}

export function normalize(text: string): string {
    if (!text) return text;
    let words = text.toLowerCase().split(" ");
    words.forEach( (word: string) => word = capitalize(word) )
    return words.join(" ");
}

export function buildCardLine(symbols: string, index: number, lineSize: number = 11) {
    const size = symbols.length;
    let result =
        symbols
            .padStart(index + symbols.length + 1)
            .padEnd(11)
            .substring(0, lineSize);
    return result;
}