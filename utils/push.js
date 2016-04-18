/***
 * Copyright (c) 2015, 2016 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */

/**
 * Consistent method for returning a subscription id for a pushSubscription.
 *
 * @param {Object} subscription - The pushSubscription object.
 * @returns {String} The subscription id, null if no subscription supplied.
 */
export function getSubscriptionId (subscription) {
  if (!subscription) {
    return null;
  }

  let subscriptionId = null;

  if (subscription.endpoint) {
    let endpointSections = subscription.endpoint.split('/');
    subscriptionId = endpointSections[endpointSections.length - 1];
  }

  if (!subscriptionId && typeof subscription.getKey === 'function') {
    // This should be unique enough to act like an id for purpose.
    subscriptionId = subscription.getKey();
  }

  return subscriptionId;
}

export default {
  getSubscriptionId
};
