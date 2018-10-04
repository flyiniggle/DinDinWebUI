interface IMeal {
    id: number,
    name: string,
    owner: string,
    taste: number,
    difficulty: number,
    lastUsed: string,
    usedCount: number,
    notes: string,
    ingredients: Array<string>
}

export default IMeal;