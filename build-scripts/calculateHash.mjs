import { createHash } from "crypto";

// This calculates the sha-256 value for the index.html <script> tag for use inside the CSP header
const inlineStyle = `
   .Site__Message img.icon,
   .Site__SocialList img.icon {
     width: 2rem;
     vertical-align: middle;
     margin-right: 1rem;
   }
`;

const hash = createHash('sha256').update(inlineStyle, 'utf-8').digest('base64');

console.log("Hash: ", hash);
