function Meal({pk: id, name, owner, taste, difficulty, last_used: lastUsed, used_count: usedCount, notes}) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.taste = taste;
    this.difficulty = difficulty;
    this.lastUsed = lastUsed;
    this.usedCount = usedCount;
    this.notes = notes;
}

export default Meal;