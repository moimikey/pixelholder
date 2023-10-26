export interface PixelHolderCreateOptions {
  widthInPixels?: number;
  heightInPixels?: number;
}

export interface PixelHolder extends PixelHolderCreateOptions { };

export class PixelHolder {
  public widthInPixels: number;
  public heightInPixels: number;
  public options: PixelHolderCreateOptions;

  static create(options: PixelHolderCreateOptions): PixelHolder {
    return new PixelHolder(options);
  }

  constructor(options: PixelHolderCreateOptions) {
    const defaultOptions: PixelHolderCreateOptions = {
      widthInPixels: 1,
      heightInPixels: 1
    };
    this.options = { ...defaultOptions, ...options };
    this.widthInPixels = this.options.widthInPixels ||= 1;
    this.heightInPixels = this.options.heightInPixels ||= 1;
  }
  public createDummyGif(options: PixelHolderCreateOptions): Uint8Array {
    const { widthInPixels = 1, heightInPixels = 1 } = options || {};
    /**
     * @see https://giflib.sourceforge.net/whatsinagif/bits_and_bytes.html
     *
     */
    const bytes = new Uint8Array([
      71, 73, 70, 56, 57, 97,                 // 6 bytes (header: GIF89a)
      widthInPixels, 0, heightInPixels, 0,    // 4 bytes (logical screen width, logical screen height)
      44,                                     // 1 byte (packed field of 8 bits)
      0,                                      // 1 byte (bg color index)
      255,                                    // 1 byte (pixel aspect ratio)
      0, 0, 0,                                // 3 bytes (global color table: black)
      59,                                     // 1 byte (trailer: ;)
    ]);
    return new Uint8Array(bytes);
  }
  private encodeBase64(byteArray: Uint8Array): string {
    if (typeof btoa === 'function') {
      const binaryString = byteArray.reduce((str, byte) => str + String.fromCharCode(byte), '');
      return btoa(binaryString);
    } else {
      throw new Error('Base64 encoding is not available in this environment.');
    }
  }
  private toBase64(gifData: Uint8Array): string {
    const base64String = this.encodeBase64(gifData);
    return base64String;
  }
}

// make a 10x10 placeholder pixel
//
// const placeholder = PixelHolder.create({ widthInPixels: 10, heightInPixels: 10 });
// placeholder.toBase64();
// data:image/gif;base64,XXXXXXXXX
