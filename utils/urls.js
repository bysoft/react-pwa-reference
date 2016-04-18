/***
 * Copyright (c) 2015, 2016 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */

/**
 * Given a url, extract the hostname part.
 *
 * @param {String} url - The url from which to pull the hostname.
 * @returns {String} The hostname from the given url.
 */
export function getHostname (url) {
  return url.replace(/^[^\/]*\/\/([^\/\?#\:]+).*$/,
    function (all, hostname) {
      return hostname;
    });
}

/**
 * Given a url, extract the last path segment.
 * Last path segment is the file name, or file, or any last part of the path
 *   before ?|#|$
 *
 * @param {String} url - The url from which to pull the last path segment.
 * Can be absolute or relative url, path, file, or path and qs/hash
 * @returns {String} The last path segment
 */
export function getLastPathSegment (url) {
  const matches = /(?:\/{1}|^)([\w\-\.]+)\/?(?=\?|#|$)/.exec(url);
  return matches && matches[1] || '';
}

/**
 * The significant hostname is the last hostname token before the TLD.
 *   https://subdom.significant-hostname.com/someotherstuff
 *
 * @param {String} url - The url from which to pull the significant hostname.
 * @returns The second to last hostname token between dots for a given url.
 */
export function getSignificantHostname (url) {
  const hostname = getHostname(url);
  const names = hostname.split('.');
  const significantIndex = names.length < 2 ? 0 : names.length - 2;
  return names[significantIndex];
}

export default {
  getHostname,
  getSignificantHostname,
  getLastPathSegment
};
