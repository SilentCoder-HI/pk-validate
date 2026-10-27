# pk-validate contributor instructions

- Keep the package dependency-free at runtime and preserve ESM/CommonJS output with TypeScript declarations.
- Validate input structure only; do not imply identity, assignment, or reachability verification.
- Never log or commit real CNICs, phone numbers, or other personal data. Use synthetic test fixtures.
- Add tests for behavior changes and run `npm test`, `npm run typecheck`, and `npm run build`.
- Only add allocation datasets when an authoritative public source and limitations are documented.
- Update the README and CHANGELOG for public API or behavior changes.
