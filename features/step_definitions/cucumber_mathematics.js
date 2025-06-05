const assert = require('assert');
const {Given, When, Then} = require('@cucumber/cucumber');
const logger = require("../../utils/logger");

Given('I have {int} cucumbers', function (amount) {
    logger.info('I have ' + amount + ' cucumbers');
    this.cucumbers = amount;
});


Given('I have {int} carrots', function (count) {
    logger.info('I have ' + count + ' carrots');
    this.carrots = count;
})

When('I eat {int} cucumbers', function (amount) {
    logger.info('I eat ' + amount + ' cucumbers');
    this.cucumbers -= amount;
});

Then('I have {int} cucumber', function (expectedCount) {
    assert.equal(this.cucumbers, expectedCount, `Expected ${expectedCount} cucumbers, but have ${this.cucumbers}`);
});


When('I eat {int} carrots', function (amount) {
    logger.info('I eat ' + amount + ' carrots');
    this.carrotsToEat = amount;
})

Then('I should get an error {string}', function (expectedAnswer) {
    if (this.carrotsToEat > this.carrots) {
        assert.strictEqual(expectedAnswer, 'Not enough carrots');
    } else {
        logger.error('Enough carrots carrots to eat');
        assert.fail('Enough carrots carrots to eat');
    }
});


When('I make a salad with {int} cucumbers and {int} carrots', function (cucumber, carrot) {
    if (this.cucumbers < cucumber) {
        logger.error('Not enough cucumbers');
        assert.fail('Not enough cucumbers');
    }
    if (this.carrots < carrot) {
        logger.error('Not enough carrots');
        assert.fail('Not enough carrots');
    }
    this.cucumbers -= cucumber;
    this.carrots -= carrot;
    this.salad = (this.salad || 0) + 1;

});


Then('I have {int} salad', function (expectedCount) {
    assert.equal(this.salad, expectedCount, `Expected ${expectedCount} salad(s), but have ${this.salad}`);

})