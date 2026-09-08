# QRCodeReader

A static, browser-only utility for decoding QR codes from local image files.

## Development

Open `index.html` directly in a browser, or serve this directory with a static
file server. The page loads jsQR 1.4.0 from jsDelivr; no application server or
build step is required.

Images are processed in the browser and are not uploaded. Images are limited to
10 MB and are scaled to a maximum dimension of 2000 pixels while decoding.
