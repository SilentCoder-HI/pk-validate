# Changelog

All notable changes to this project are documented here. This project follows [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-10-27

### Stable release
- Mark the CNIC, mobile, NTN, postal-code, and Pakistani IBAN helpers as the stable 1.0.0 API.
- Keep validation format-only; no identity, registration, assignment, or reachability checks are performed.

## [0.1.0] - 2026-10-27

### Added
- Structural CNIC validation, normalization, formatting, and masking.
- Pakistani mobile number validation, E.164 normalization, and local formatting.
- Format-only NTN, postal code, and Pakistani IBAN helpers with mod-97 checksum validation.
- Interactive browser playground controls for all supported validators.
- Responsive React About page with Tailwind CSS, theme toggle, SEO metadata, and Vercel configuration.
- Matching Home, Playground, and Docs pages with shared navigation, footer, and theme support.
- TypeScript build configuration, test suite, CI workflow, and contributor documentation.
