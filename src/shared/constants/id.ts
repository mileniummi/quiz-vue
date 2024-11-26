function* uniqueIdGenerator() {
  let id = 0;
  while (true) {
    // eslint-disable-next-line no-plusplus
    yield ++id;
  }
}

export const uniqueId = uniqueIdGenerator();
