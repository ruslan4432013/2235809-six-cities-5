export type Coords = {
  latitude: string
  longitude: string
}

export const parseCoords = (value: unknown): Coords => {
  if (!(typeof value === 'string')) {
    throw new Error(`Incorrect coords provided ${value}`);
  }
  const divided = value.split(';').map((word) => word.trim());
  if (divided.length !== 2) {
    throw new Error(`Incorrect coords provided ${value}`);
  }
  const [latitude, longitude] = value;
  return ({
    latitude,
    longitude,
  });
};
