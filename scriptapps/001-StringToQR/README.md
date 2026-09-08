# StringToQR

A static, browser-only utility for converting text into downloadable QR code
images.

## Development

Open `index.html` directly in a browser, or serve this directory with a static
file server. The page loads QRCode.js 1.0.0 from cdnjs; no application server
or build step is required.

## Options

- PNG or JPEG image output
- 128, 256, 384, or 512 pixel output
- QR error correction levels L (7%), M (15%), Q (25%), and H (30%)

Text is passed only to the in-browser QR generator and is not sent to an
application backend.
