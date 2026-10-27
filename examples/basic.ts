import { cnic, phone } from "../src/index.js";

// Always use fictional/synthetic identifiers in examples.
console.log(cnic.mask("35202-1234567-1"));
console.log(phone.normalize("0300-1234567"));
