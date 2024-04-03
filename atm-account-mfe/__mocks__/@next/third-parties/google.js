const mockGA = jest.genMockFromModule('@next/third-parties/google');

export function sendGAEvent(...args) {
    return mockGA.sendGAEvent(args);
}