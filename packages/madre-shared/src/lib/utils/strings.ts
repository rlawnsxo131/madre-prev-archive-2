export function capitalize(str: string) {
  return (str.at(0) ?? '').toUpperCase().concat(str.slice(1));
}
