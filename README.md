# pk-validate

Zero-dependency utilities for **structural validation and formatting** of Pakistani CNICs, mobile numbers, NTN formats, postal codes, and IBANs. These checks do not confirm identity, registration, account existence, ownership, or reachability.

```ts
import { cnic, phone, ntn, postalCode, iban } from "pk-validate";

cnic.isValid("35202-1234567-1"); // true
cnic.normalize("3520212345671"); // "35202-1234567-1"
cnic.mask("35202-1234567-1"); // "35202-*******-1"

phone.isValid("+92 300 1234567"); // true
phone.normalize("0300-1234567"); // "+923001234567"
phone.format("+923001234567"); // "0300-1234567"

ntn.format("12345678"); // "1234567-8"
postalCode.isValid("44000"); // true
iban.format("PK36SCBL0000001123456702"); // "PK36 SCBL 0000 0011 2345 6702"
```

## Install

```sh
npm install pk-validate
```

## API

| Module | Method | Result |
| --- | --- | --- |
| `cnic` | `isValid(value)` | Whether input has 13 digits, optionally `12345-1234567-1` |
| `cnic` | `normalize(value)` / `format(value)` | Canonical dashed form or `null` |
| `cnic` | `mask(value)` | Masks the seven middle digits or `null` |
| `phone` | `isValid(value)` | Whether input matches a Pakistani mobile-number shape |
| `phone` | `normalize(value)` | E.164 form (`+923xxxxxxxxx`) or `null` |
| `phone` | `format(value)` | Local form (`03xx-xxxxxxx`) or `null` |
| `ntn` | `isValid(value)` | 8 digits or 13-digit CNIC-based individual NTN shape |
| `ntn` | `format(value)` | `1234567-8` or CNIC-style dashed form, otherwise `null` |
| `postalCode` | `isValid(value)` | Five digits, not starting with zero; format check only |
| `iban` | `isValid(value)` | Pakistani 24-character structure and mod-97 checksum |
| `iban` | `format(value)` | Valid IBAN grouped in fours, otherwise `null` |
| `iban` | `bankCode(value)` | Four-letter bank code from a valid IBAN, otherwise `null` |

Phone inputs may use local `03xxxxxxxxx`, international `+923xxxxxxxxx`, or international access prefix `00923xxxxxxxxx`; spaces, parentheses, periods, and hyphens are accepted as separators. `normalize` and formatting methods return `null` for invalid input.

## Privacy and accuracy

- CNICs are sensitive personal data. Avoid logging them; use `cnic.mask()` when displaying a CNIC.
- Validation checks shape only. It cannot verify an identity, issuance, ownership, assignment, or reachability.
- NTN checks recognize common 8-digit and individual CNIC-based 13-digit shapes only; they do not confirm FBR registration or apply an undocumented checksum.
- Postal-code validation checks a five-digit pattern only; it does not confirm that a postal code exists.
- IBAN validation checks Pakistani structure and the standard mod-97 checksum only; it does not confirm that an account exists or is active. Example IBANs are synthetic test values, not account claims.
- Carrier lookup is intentionally excluded: number portability and lack of a maintained authoritative prefix source make a carrier result unreliable.

## Development

```sh
npm install
npm run dev
npm test
npm run typecheck
npm run build
```

`npm run dev` launches the local React + Vite site. The Home page is at `/`, with matching branded pages at `/playground.html`, `/about.html`, and `/docs.html`. The Playground imports the same source modules as the package and processes input entirely in the browser. Use synthetic values only.

Vercel build settings and clean route rewrites (`/playground`, `/about`, `/docs`) are in [vercel.json](vercel.json).

The npm package publishes only the built library and package essentials (`dist/`, `README.md`, and `LICENSE`), as restricted by the `files` allowlist in `package.json`; `.npmignore` additionally excludes website, test, and development files. The repository `.gitignore` is separate and does not control npm package contents.

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidance. Changes follow [Keep a Changelog](CHANGELOG.md) and semantic versioning.
