interface APIMeal {
    pk?: number,
    name?: string,
    owner?: string,
    taste?: number,
    difficulty?: number,
    last_used?: string,
    used_count?: number,
    notes?: string,
    ingredients?: Array<string>,
    collaborators?: number[]
}

export default APIMeal;