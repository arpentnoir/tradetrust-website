import { Selector } from "testcafe";
import { validateTextContent, validateIframeTexts, validateIssuerTexts } from "./helper";

fixture("Load action from plain certificate").page`http://localhost:3000`;

const DocumentStatus = Selector("#document-status");
const ViewerContainer = Selector("#viewer-container");

test("Load document from action should work when url is valid", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://raw.githubusercontent.com/Open-Attestation/gallery/master/static/documents/ebl.tt`,
      permittedActions: ["VIEW", "STORE"],
      redirect: "https://dev.tradetrust.io/",
    },
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);

  await validateIssuerTexts(["DEMO-TRADETRUST.OPENATTESTATION.COM"]);
  validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});

test("Load document from action should fail when url is invalid", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://raw.githubusercontent.com/Open-Attestation/gallery/master/static/documents/123.tt`,
      redirect: "https://dev.tradetrust.io/",
    },
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);

  await DocumentStatus.with({ visibilityCheck: false })();
  await validateTextContent(t, ViewerContainer, [
    "This document is not valid",
    "Unable to load certificate with the provided parameters",
    "Unable to load the certificate from https://raw.githubusercontent.com/Open-Attestation/gallery/master/static/documents/123.tt",
  ]);
});
