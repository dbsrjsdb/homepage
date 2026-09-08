# JWTInspector

JWTInspector is a dependency-free static utility that decodes JWT header and payload sections locally, formats their JSON, and reports numeric `exp`/`iat` timing claims.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. No build step or backend is required.

## Notes

- The tool does not verify signatures, validate issuers, or make security claims about a token.
- Tokens are not persisted; decoding uses browser APIs only and invalid Base64URL/JSON is reported without crashing.
