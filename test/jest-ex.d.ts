declare namespace jest {
  interface It {
    if: (condition: boolean) => jest.It;
  }
}
