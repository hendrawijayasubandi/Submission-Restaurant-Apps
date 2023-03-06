Feature('Liking Restaurant');

const assert = require('assert');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.dontSee('.restaurant-item');

  I.amOnPage('/');
  pause();

  I.seeElement('.restaurant-item__name a');

  const firstRestaurant = locate('.restaurant-item__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item__name a');
  const likedRestaurant = locate('.restaurant-item__name a').first();
  const likedRestaurantName = await I.grabTextFrom(likedRestaurant);

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('liking one restaurant and unliking it', async ({ I }) => {
  I.dontSee('.restaurant-item');

  I.amOnPage('/');

  I.seeElement('.restaurant-item__name a');

  const firstRestaurant = locate('.restaurant-item__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item__name a');
  const likedRestaurant = locate('.restaurant-item__name a').first();
  const likedRestaurantName = await I.grabTextFrom(likedRestaurant);

  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  I.click(likedRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.dontSee('.restaurant-item');
});
