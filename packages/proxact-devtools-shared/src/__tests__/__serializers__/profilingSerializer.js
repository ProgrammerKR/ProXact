import hasOwnProperty from 'shared/hasOwnProperty';

const FILTERED_VERSION_STRING = '<filtered-version>';

// `test` is part of Jest's serializer API
export function test(maybeProfile) {
  if (
    maybeProfile != null &&
    typeof maybeProfile === 'object' &&
    hasOwnProperty.call(maybeProfile, 'proxactVersion') &&
    maybeProfile.proxactVersion !== FILTERED_VERSION_STRING
  ) {
    return true;
  }

  return false;
}

// print() is part of Jest's serializer API
export function print(profile, serialize, indent) {
  return serialize({
    ...profile,
    proxactVersion: FILTERED_VERSION_STRING,
  });
}
