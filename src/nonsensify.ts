/**
 * Escapes special characters in a string to be used in a regular expression.
 *
 * This function replaces characters that have special meaning in regular expressions
 * (such as `.`, `*`, `+`, `?`, `^`, `$`, `{`, `}`, `(`, `)`, `|`, `[`, `]`, `\`)
 * with their escaped counterparts, making the string safe to use as a literal pattern.
 *
 * @param str - The input string to escape.
 * @returns The escaped string, safe for use in a regular expression.
 */
function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Returns a random element from the provided array.
 *
 * @typeParam T - The type of elements in the array.
 * @param arr - The array from which to select a random element.
 * @returns A randomly selected element from the array.
 */
export function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Extracts variable names from the provided source code text based on the specified programming language.
 *
 * Currently supports JavaScript, TypeScript, and Python variable declarations.
 *
 * @param text - The source code as a string from which to extract variable names.
 * @param languageId - The language identifier (e.g., 'javascript', 'typescript', 'python').
 * @returns An array of unique variable names found in the source code.
 */
export function getVariables(text: string, languageId: string): string[] {
    const vars = new Set<string>();

    switch (languageId) {
        case 'javascript':
        case 'typescript':
            const tsRegex = /\b(?:let|const|var)\s+([a-zA-Z_$][\w$]*)/g;
            let tsMatch: RegExpExecArray | null;

            while ((tsMatch = tsRegex.exec(text)) !== null) {
                if (tsMatch[1]) {
                    vars.add(tsMatch[1]);
                }
            }
            break;
        
        case 'python':
            const pyRegex = /^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*=/gm;
            let pyMatch: RegExpExecArray | null;
            while ((pyMatch = pyRegex.exec(text)) !== null) {
                vars.add(pyMatch[1]);
            }
            break;
            
        default:
            break;
    }

    return Array.from(vars);
}

/**
 * Replaces all occurrences of a specific variable name in the given text with a new variable name.
 *
 * @param text - The input string in which to perform the replacement.
 * @param variableName - The variable name to search for and replace.
 * @param nonsenseVariableName - The new variable name to replace the original with.
 * @returns The modified string with all instances of the variable name replaced.
 */
export function replaceVariable(text: string, variableName: string, nonsenseVariableName: string): string {
    const regex = new RegExp(`\\b${escapeRegExp(variableName)}\\b`, 'g');
    return text.replace(regex, nonsenseVariableName);
}

/**
 * A set containing a collection of whimsical and nonsensical words.
 * 
 * @remarks
 * The words included are purely fictional and serve as examples of
 * non-standard vocabulary for creative or entertainment purposes.
 * 
 */
const nonsense = new Set([
    "blorp", "zibble", "snorfle", "wizzle", "flibber", "glonk", "sploof", "twizzle", "quibber", "drumble",
    "snizzle", "plonkle", "gribble", "snoodle", "twonk", "frizzle", "bazzle", "klomple", "squibble", "womple",
    "jibber", "plibble", "snorkle", "twibble", "glibble", "froodle", "womble", "crundle", "sploosh", "drizzle",
    "blizzle", "snuzzle", "twizzlepop", "gronkle", "flomple", "squizzle", "plonker", "wizzlewump", "snarfle", "twonkle",
    "frabble", "blonkle", "sploofle", "drumblebop", "snizzlewump", "plonklepop", "gribblewump", "snoodlepop", "twonklewump", "frizzlepop",
    "bazzleflop", "klomplebop", "squibblepop", "womplebop", "jibberwump", "plibblepop", "snorklewump", "twibblebop", "glibblepop", "froodleflop",
    "womblepop", "crundlebop", "splooshwump", "drizzlepop", "blizzlewump", "snuzzlepop", "twizzlewump", "gronklepop", "flomplebop", "squizzlewump",
    "plonkerpop", "wizzlewomble", "snarflewump", "twonklepop", "frabblewump", "blonklepop", "splooflewump", "drumblepop", "snizzlepop", "plonklewump",
    "gribblepop", "snoodleflop", "twonkleflop", "frizzlewump", "bazzlewump", "klomplepop", "squibblewump", "womplepopple", "jibberpop", "plibblewump",
    "snorklepop", "twibblewump", "glibblewump", "froodlepop", "womblewump", "crundlepop", "splooshpop", "drizzlewump", "blizzlepop", "snuzzlewump",
    "flonkadoo", "snaggletush", "wompleflap", "drizzlepuff", "twizzlefritz", "bloopernoodle", "squonklet", "fribberwock", "glomplebop", "snizzlefritz",
    "plonkerdoodle", "twizzleblat", "gribbleflap", "snoodlepuff", "twonkleblitz", "frizzleblop", "bazzlewhomp", "klompleflap", "squibblefritz", "wompleblat",
    "jibberflap", "plibblewhomp", "snorklepuff", "twibbleblitz", "glibbleblop", "froodlewhomp", "wombleflap", "crundlefritz", "splooshblat", "drizzleblop",
    "blizzlewhomp", "snuzzleflap", "twizzleblitz", "gronkleblop", "flomplewhomp", "squizzleflap", "plonkerblitz", "wizzleflop", "snarfleblop", "twonklewhomp",
    "frabbleflap", "blonkleblitz", "splooflewhomp", "drumbleflap", "snizzleblitz", "plonklewhomp", "gribbleblop", "snoodlewhomp", "twonkleflap", "frizzleblitz",
    "bazzleflap", "klompleblitz", "squibblewhomp", "wompleblop", "jibberblitz", "plibbleflap", "snorklewhomp", "twibbleblop", "glibbleflap", "froodleblitz",
    "wombleblop", "crundleblitz", "splooshflap", "drizzleflap", "blizzleblitz", "snuzzlewhomp", "twizzlewhomp", "gronkleflap", "flompleblitz", "squizzlewhomp",
    "plonkerflap", "wizzleblitz", "snarflewhomp", "twonkleblop", "frabbleblitz", "blonkleflap", "sploofleblitz", "drumblewhomp", "snizzlewhomp", "plonkleblop",
    "gribbleflap", "snoodleblitz", "twonklewhomp", "frizzlewhomp", "bazzleblitz", "klomplewhomp", "squibbleblop", "womplewhomp", "jibberflap", "plibbleblitz",
    "snorkleflap", "twibblewhomp", "glibbleblitz", "froodlewhomp", "wombleblitz", "crundlewhomp", "splooshblitz", "drizzlewhomp", "blizzleflap", "snuzzleblitz",
    "womplefritz", "snagglesnuff", "twizzlewobble", "fribberflap", "squonkadoodle", "blonklewhomp", "drumbleblitz", "snarfleflap", "plibblewhiff", "twonklefritz"
]);

/**
 * Generates and returns a random nonsense word from a predefined collection.
 *
 * @returns {string} A randomly selected nonsense word.
 */
export function generateNonsenseWord(): string {
    const nonsenseArray = Array.from(nonsense);
    return getRandomElement(nonsenseArray);
}

/**
 * Checks if the given word is already present in the set of nonsense words.
 *
 * @param word - The word to check.
 * @returns True if the word is in the nonsense set, false otherwise.
 */
export function isNonsenseWord(word: string): boolean {
    return nonsense.has(word);
}
