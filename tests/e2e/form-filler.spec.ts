import { test, expect } from "./safe-test";

test("form filler loads its browser-only engine and supports manual entry", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto("/tools/form-filler");
  expect(response?.status()).toBe(200);
  expect(response?.headers()["content-security-policy"]).toContain("connect-src 'self'");
  await page.getByRole("button", { name: "Enter details manually", exact: true }).click();
  await expect(page.getByText("Applicant (the parent applying)", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Fill my forms", exact: true })).toBeDisabled();
  await page.getByLabel("Full name (SURNAME, Given)", { exact: true }).first().fill("EXAMPLE, Test Applicant");
  await page.getByRole("button", { name: "Fill my forms", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Your forms are ready" })).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download filled PDF", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("imm-5645-filled.pdf");
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream!) chunks.push(Buffer.from(chunk));
  // The official template retains its encryption flag; MuPDF handles this
  // supported form without stripping it or weakening the download assertion.
  const mupdf = await import("mupdf");
  const pdf = mupdf.PDFDocument.openDocument(new Uint8Array(Buffer.concat(chunks)), "application/pdf") as import("mupdf").PDFDocument;
  const values: string[] = [];
  for (let p = 0; p < pdf.countPages(); p++) {
    for (const widget of pdf.loadPage(p).getWidgets()) {
      if (widget.getName().endsWith("Applicant[0].AppName[0]")) values.push(widget.getValue());
    }
  }
  expect(values).toEqual(["EXAMPLE, Test Applicant"]);
  pdf.destroy();
  await expect(page.getByText(/This tool does not fill the IMM 5257 PDF directly/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Download answer sheet", exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});
