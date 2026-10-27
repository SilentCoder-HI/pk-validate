import { cnic, phone, ntn, postalCode, iban } from "../src/index.js";
import "./style.css";

function renderStatus(valid: boolean, detail: string): string {
  return `<div class="result-status ${valid ? "is-valid" : "is-invalid"}"><span class="result-status-icon">${valid ? "✓" : "!"}</span><span>${valid ? "Valid format" : "Invalid format"}</span><span class="status-detail">${detail}</span></div>`;
}

function renderRow(label: string, value: string, valid: boolean): string {
  return `<div class="result-row"><span class="result-label">${label}</span><span class="result-value ${valid ? "" : "muted-value"}">${value}</span></div>`;
}

function getInput(id: string): HTMLInputElement {
  return document.querySelector<HTMLInputElement>(`#${id}`)!;
}

function getResults(id: string): HTMLDivElement {
  return document.querySelector<HTMLDivElement>(`#${id}`)!;
}

function updateCnic(): void {
  const value = getInput("cnic-input").value;
  const valid = cnic.isValid(value);
  getResults("cnic-results").innerHTML = `
    ${renderStatus(valid, valid ? "13 digits" : "Expected 13 digits")}
    ${renderRow("Normalized", cnic.normalize(value) ?? "—", valid)}
    ${renderRow("Masked", cnic.mask(value) ?? "—", valid)}
    ${renderRow("Formatted", cnic.format(value) ?? "—", valid)}`;
}

function updatePhone(): void {
  const value = getInput("phone-input").value;
  const valid = phone.isValid(value);
  getResults("phone-results").innerHTML = `
    ${renderStatus(valid, valid ? "Pakistani mobile" : "Check number format")}
    ${renderRow("Normalized · E.164", phone.normalize(value) ?? "—", valid)}
    ${renderRow("Local format", phone.format(value) ?? "—", valid)}`;
}

function updateNtn(): void {
  const value = getInput("ntn-input").value;
  const valid = ntn.isValid(value);
  getResults("ntn-results").innerHTML = `
    ${renderStatus(valid, valid ? "8 or 13 digits" : "Expected 8 or 13 digits")}
    ${renderRow("Formatted", ntn.format(value) ?? "—", valid)}`;
}

function updatePostalCode(): void {
  const value = getInput("postal-input").value;
  const valid = postalCode.isValid(value);
  getResults("postal-results").innerHTML = `
    ${renderStatus(valid, valid ? "5 digits" : "Expected 5 digits")}
    ${renderRow("Trimmed value", valid ? value.trim() : "—", valid)}`;
}

function updateIban(): void {
  const value = getInput("iban-input").value;
  const valid = iban.isValid(value);
  getResults("iban-results").innerHTML = `
    ${renderStatus(valid, valid ? "PK · mod-97 passed" : "Check structure / checksum")}
    ${renderRow("Formatted", iban.format(value) ?? "—", valid)}
    ${renderRow("Bank code", iban.bankCode(value) ?? "—", valid)}`;
}

const updates: Record<string, () => void> = {
  "cnic-input": updateCnic,
  "phone-input": updatePhone,
  "ntn-input": updateNtn,
  "postal-input": updatePostalCode,
  "iban-input": updateIban,
};

Object.entries(updates).forEach(([id, update]) => getInput(id).addEventListener("input", update));

document.querySelectorAll<HTMLButtonElement>("[data-clear]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.clear!) as HTMLInputElement;
    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
  });
});

Object.values(updates).forEach((update) => update());