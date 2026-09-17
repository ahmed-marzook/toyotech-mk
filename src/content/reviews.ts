/**
 * Hand-picked Google reviews (static — no API). Update the rating/count and
 * quotes here when new reviews come in. Only copy real reviews from the listing.
 */

export type Review = {
  quote: string;
  /** Reviewer's display name as shown on Google — leave undefined if not recorded */
  author?: string;
};

export const googleReviews = {
  businessName: 'Toyotech Hybrid Autos',
  placeId: 'ChIJdd_Of5tVdkgROhBlr-LHD4U',
  rating: 4.8,
  count: 10,
  listingUrl: 'https://share.google/igMJfXrwPXxMLlpxE',
  reviews: [
    { quote: 'Great mechanic shop, very friendly and they go above and beyond' },
    {
      quote:
        'Brought in a Toyota Prius expecting to pay a lot. Instead they gave me a great deal with speedy turn around... Very happy with the top notch service.',
    },
    { quote: 'Best for all car repairs at affordable cost. Been servicing for 3 years now.' },
  ] satisfies Review[],
};
