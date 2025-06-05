function validateIngredients(cucumberAmount, carrotAmount) {
    if (this.cucumbers < cucumberAmount) {
        throw new Error('Not enough cucumbers');
    }
    if (this.carrots < carrotAmount) {
        throw new Error('Not enough carrots');
    }
}
