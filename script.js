const lengthSlider = document.getElementById("pass-length");
const lengthVal = document.getElementById("length-val");
const upperCheck = document.getElementById("include-upper");
const lowerCheck = document.getElementById("include-lower");
const numbersCheck = document.getElementById("include-numbers");
const symbolsCheck = document.getElementById("include-symbols");
const generateBtn = document.getElementById("generate-btn");
const passwordOutput = document.getElementById("password-output");
const strengthIndicator = document.getElementById("strength-indicator");

// Live updater for slider length label
lengthSlider.addEventListener("input", () => {
  lengthVal.textContent = lengthSlider.value;
});

function generatePassword() {
  const targetLength = parseInt(lengthSlider.value);
  
  // Character pools
  const upperPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerPool = "abcdefghijklmnopqrstuvwxyz";
  const numPool = "0123456789";
  const symbolPool = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let combinedPool = "";
  if (upperCheck.checked) combinedPool += upperPool;
  if (lowerCheck.checked) combinedPool += lowerPool;
  if (numbersCheck.checked) combinedPool += numPool;
  if (symbolsCheck.checked) combinedPool += symbolPool;

  // Fallback if no criteria checkboxes are ticked
  if (combinedPool === "") {
    passwordOutput.textContent = "SELECT_AN_OPTION";
    return;
  }

  let finalPassword = "";

  // STANDARD LOOP SYSTEM: Appends characters iteratively until requested length is met
  for (let i = 0; finalPassword.length < targetLength; i++) {
    const randomIndex = Math.floor(Math.random() * combinedPool.length);
    const pickedChar = combinedPool[randomIndex];

    // CODE INTERRUPTION (continue/break): Skip ambiguous/invalid confusion characters
    // Example: If an accidental space or dangerous backslash somehow loops in, skip it!
    if (pickedChar === " " || pickedChar === "\\") {
      continue; // Skips current iteration to roll a safer character
    }

    finalPassword += pickedChar;

    // Safety hard-break if loop spins out of control safely
    if (i > 100) {
      break;
    }
  }

  // Inject generated hash string into DOM
  passwordOutput.textContent = finalPassword;

  // VISUAL INDICATOR: Check string length to determine weakness
  if (targetLength < 14) {
    passwordOutput.className = "weak-pass";
    strengthIndicator.className = "strength-banner warning";
    strengthIndicator.textContent = "Status: System Vulnerable (Short Key)";
  } else {
    passwordOutput.className = "secure-pass";
    strengthIndicator.className = "strength-banner secure";
    strengthIndicator.textContent = "Status: Encryption Highly Secure!";
  }
}

// Trigger generation on button tap
generateBtn.addEventListener("click", generatePassword);
