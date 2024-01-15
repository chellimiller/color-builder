import generateUUID from './generateUUID';

describe('generateUUID', () => {
  it('should generate a UUID in the expected format', () => {
    // Act
    const result = generateUUID();

    // Assert
    expect(result).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });
});
