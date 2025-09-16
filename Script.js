// Template configurations
const templates = {
  simple: {
    showHeader: false,
    showButton: true,
    showFooter: true,
    layout: "single-column",
  },
  "header-content": {
    showHeader: true,
    showButton: true,
    showFooter: true,
    layout: "header-content",
  },
  newsletter: {
    showHeader: true,
    showButton: true,
    showFooter: true,
    layout: "newsletter",
  },
  promotional: {
    showHeader: false,
    showButton: true,
    showFooter: false,
    layout: "promotional",
  },
};

let currentTemplate = "simple";

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  updatePreview();
  bindEvents();
});

function bindEvents() {
  // Template selection
  document.querySelectorAll(".template-option").forEach((option) => {
    option.addEventListener("click", function () {
      document
        .querySelectorAll(".template-option")
        .forEach((o) => o.classList.remove("active"));
      this.classList.add("active");
      currentTemplate = this.dataset.template;
      updatePreview();
    });
  });

  // Color inputs
  ["bgColor", "primaryColor", "textColor", "buttonColor"].forEach((id) => {
    document.getElementById(id).addEventListener("input", updatePreview);
  });

  // Text inputs
  [
    "emailSubject",
    "mainHeading",
    "mainContent",
    "buttonText",
    "buttonLink",
    "footerText",
  ].forEach((id) => {
    document.getElementById(id).addEventListener("input", updatePreview);
  });

  // Select inputs
  document
    .getElementById("fontFamily")
    .addEventListener("change", updatePreview);

  // Range inputs
  [
    "fontSize",
    "contentWidth",
    "contentPadding",
    "logoSize",
    "mobileWidth",
    "mobileFontSize",
  ].forEach((id) => {
    const input = document.getElementById(id);
    const valueSpan = document.getElementById(id + "Value");
    if (input && valueSpan) {
      input.addEventListener("input", function () {
        valueSpan.textContent = this.value + "px";
        updatePreview();
      });
    }
  });

  // Logo checkbox
  document
    .getElementById("includeLogo")
    .addEventListener("change", function () {
      const logoInputs = ["logoUrl", "logoPosition", "logoSize"];
      logoInputs.forEach((id) => {
        document.getElementById(id).disabled = !this.checked;
      });
      updatePreview();
    });

  // Logo inputs
  ["logoUrl", "logoPosition"].forEach((id) => {
    document
      .getElementById(id)
      .addEventListener(id === "logoUrl" ? "input" : "change", updatePreview);
  });

  // Responsive design checkbox
  document
    .getElementById("responsiveDesign")
    .addEventListener("change", updatePreview);
}

function updatePreview() {
  const config = templates[currentTemplate];
  const preview = document.getElementById("emailPreview");

  const bgColor = document.getElementById("bgColor").value;
  const primaryColor = document.getElementById("primaryColor").value;
  const textColor = document.getElementById("textColor").value;
  const buttonColor = document.getElementById("buttonColor").value;
  const fontFamily = document.getElementById("fontFamily").value;
  const fontSize = document.getElementById("fontSize").value;
  const contentWidth = document.getElementById("contentWidth").value;
  const contentPadding = document.getElementById("contentPadding").value;

  const emailSubject = document.getElementById("emailSubject").value;
  const mainHeading = document.getElementById("mainHeading").value;
  const mainContent = document.getElementById("mainContent").value;
  const buttonText = document.getElementById("buttonText").value;
  const buttonLink = document.getElementById("buttonLink").value;
  const footerText = document.getElementById("footerText").value;

  const includeLogo = document.getElementById("includeLogo").checked;
  const logoUrl = document.getElementById("logoUrl").value;
  const logoPosition = document.getElementById("logoPosition").value;
  const logoSize = document.getElementById("logoSize").value;
  const responsiveDesign = document.getElementById("responsiveDesign").checked;

  let html = `
        <div style="font-family: ${fontFamily}; font-size: ${fontSize}px; color: ${textColor}; line-height: 1.6; background-color: ${bgColor}; padding: ${contentPadding}px; max-width: ${contentWidth}px; margin: 0 auto; ${
    responsiveDesign ? "width: 100%; box-sizing: border-box;" : ""
  }">
    `;

  // Logo section
  if (includeLogo && logoUrl) {
    const logoAlignment = logoPosition === "left" ? "left" : "center";
    html += `
            <div style="text-align: ${logoAlignment}; margin-bottom: 30px; ${
      logoPosition === "left" ? "padding-left: 0;" : ""
    }">
                <img src="${logoUrl}" alt="Logo" style="max-width: ${logoSize}px; height: auto; display: ${
      logoPosition === "left" ? "block" : "inline-block"
    }; ${responsiveDesign ? "max-width: 100%; width: auto;" : ""}">
            </div>
        `;
  }

  // Header section
  if (config.showHeader && emailSubject) {
    html += `
            <div style="background-color: ${primaryColor}; color: white; padding: 20px; text-align: center; margin-bottom: 30px; ${
      responsiveDesign ? "border-radius: 5px;" : ""
    }">
                <h1 style="margin: 0; font-size: ${parseInt(fontSize) + 8}px; ${
      responsiveDesign
        ? "font-size: clamp(" +
          (parseInt(fontSize) + 4) +
          "px, 5vw, " +
          (parseInt(fontSize) + 8) +
          "px);"
        : ""
    }">${emailSubject}</h1>
            </div>
        `;
  }

  // Main heading
  if (mainHeading) {
    html += `
            <h2 style="color: ${primaryColor}; margin-top: 0; margin-bottom: 20px; font-size: ${
      parseInt(fontSize) + 6
    }px; ${
      responsiveDesign
        ? "font-size: clamp(" +
          (parseInt(fontSize) + 2) +
          "px, 4vw, " +
          (parseInt(fontSize) + 6) +
          "px);"
        : ""
    }">${mainHeading}</h2>
        `;
  }

  // Main content
  if (mainContent) {
    const formattedContent = mainContent.replace(/\n/g, "<br>");
    html += `
            <div style="margin-bottom: 30px; ${
              responsiveDesign ? "word-wrap: break-word;" : ""
            }">
                ${formattedContent}
            </div>
        `;
  }

  // Button
  if (config.showButton && buttonText) {
    html += `
            <div style="text-align: center; margin: 30px 0;">
                <a href="${buttonLink}" style="background-color: ${buttonColor}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; ${
      responsiveDesign ? "min-width: 120px; padding: 15px 25px;" : ""
    }">${buttonText}</a>
            </div>
        `;
  }

  // Footer
  if (config.showFooter && footerText) {
    const formattedFooter = footerText.replace(/\n/g, "<br>");
    html += `
            <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 40px; font-size: ${
              parseInt(fontSize) - 2
            }px; color: #666; text-align: center; ${
      responsiveDesign ? "word-wrap: break-word;" : ""
    }">
                ${formattedFooter}
            </div>
        `;
  }

  html += "</div>";

  preview.innerHTML = html;
}

function generateCode() {
  const config = templates[currentTemplate];

  const bgColor = document.getElementById("bgColor").value;
  const primaryColor = document.getElementById("primaryColor").value;
  const textColor = document.getElementById("textColor").value;
  const buttonColor = document.getElementById("buttonColor").value;
  const fontFamily = document.getElementById("fontFamily").value;
  const fontSize = document.getElementById("fontSize").value;
  const contentWidth = document.getElementById("contentWidth").value;
  const contentPadding = document.getElementById("contentPadding").value;

  const emailSubject = document.getElementById("emailSubject").value;
  const mainHeading = document.getElementById("mainHeading").value;
  const mainContent = document.getElementById("mainContent").value;
  const buttonText = document.getElementById("buttonText").value;
  const buttonLink = document.getElementById("buttonLink").value;
  const footerText = document.getElementById("footerText").value;

  const includeLogo = document.getElementById("includeLogo").checked;
  const logoUrl = document.getElementById("logoUrl").value;
  const logoPosition = document.getElementById("logoPosition").value;
  const logoSize = document.getElementById("logoSize").value;
  const responsiveDesign = document.getElementById("responsiveDesign").checked;
  const mobileWidth = document.getElementById("mobileWidth").value;
  const mobileFontSize = document.getElementById("mobileFontSize").value;

  // Generate email body HTML with inline styles only
  let html = `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; margin: 0; padding: 0; background-color: #f4f4f4; font-family: ${fontFamily}; font-size: ${fontSize}px; color: ${textColor}; line-height: 1.6;">
    <tr>
        <td style="padding: 20px 10px; text-align: center;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: ${contentWidth}px; margin: 0 auto; background-color: ${bgColor}; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 100%;">
                <tr>
                    <td style="padding: ${contentPadding}px;">`;

  // Logo section
  if (includeLogo && logoUrl) {
    const logoAlignment = logoPosition === "left" ? "left" : "center";
    // Calculate responsive logo size
    const responsiveLogoSize = responsiveDesign
      ? Math.min(150, parseInt(logoSize))
      : logoSize;
    html += `
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; margin-bottom: 30px;">
                            <tr>
                                <td style="text-align: ${logoAlignment};">
                                    <img src="${logoUrl}" alt="Logo" style="max-width: ${logoSize}px; width: 100%; height: auto; border: none; display: block; ${
      logoPosition === "left" ? "margin: 0;" : "margin: 0 auto;"
    } max-width: ${
      responsiveDesign ? responsiveLogoSize + "px" : logoSize + "px"
    };">
                                </td>
                            </tr>
                        </table>`;
  }

  // Header section
  if (config.showHeader && emailSubject) {
    html += `
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; background-color: ${primaryColor}; border-radius: 5px; margin-bottom: 30px;">
                            <tr>
                                <td style="padding: 20px; text-align: center;">
                                    <h1 style="margin: 0; font-size: ${
                                      parseInt(fontSize) + 8
                                    }px; color: white; font-family: ${fontFamily};">${emailSubject}</h1>
                                </td>
                            </tr>
                        </table>`;
  }

  // Main heading
  if (mainHeading) {
    html += `
                        <h2 style="color: ${primaryColor}; margin-top: 0; margin-bottom: 20px; font-size: ${
      parseInt(fontSize) + 6
    }px; font-family: ${fontFamily};">${mainHeading}</h2>`;
  }

  // Main content
  if (mainContent) {
    const formattedContent = mainContent.replace(/\n/g, "<br>");
    html += `
                        <div style="margin-bottom: 30px; font-family: ${fontFamily}; word-wrap: break-word;">
                            ${formattedContent}
                        </div>`;
  }

  // Button
  if (config.showButton && buttonText) {
    html += `
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; margin: 30px 0;">
                            <tr>
                                <td style="text-align: center;">
                                    <!--[if mso]>
                                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${buttonLink}" style="height:44px;v-text-anchor:middle;width:200px;" arcsize="11%" stroke="f" fillcolor="${buttonColor}">
                                        <w:anchorlock/>
                                        <center style="color:white;font-family:${fontFamily};font-size:${fontSize}px;font-weight:bold;">${buttonText}</center>
                                    </v:roundrect>
                                    <![endif]-->
                                    <!--[if !mso]><!-->
                                    <a href="${buttonLink}" style="background-color: ${buttonColor}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; font-family: ${fontFamily}; font-size: ${fontSize}px; min-width: 120px; text-align: center;">${buttonText}</a>
                                    <!--<![endif]-->
                                </td>
                            </tr>
                        </table>`;
  }

  // Footer
  if (config.showFooter && footerText) {
    const formattedFooter = footerText.replace(/\n/g, "<br>");
    html += `
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; border-top: 1px solid #ddd; margin-top: 40px;">
                            <tr>
                                <td style="padding-top: 20px; font-size: ${
                                  parseInt(fontSize) - 2
                                }px; color: #666; text-align: center; font-family: ${fontFamily}; word-wrap: break-word;">
                                    ${formattedFooter}
                                </td>
                            </tr>
                        </table>`;
  }

  html += `
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`;

  // Add mobile responsive styles as inline media queries (works in most modern email clients)
  if (responsiveDesign) {
    html =
      `<style type="text/css">
@media only screen and (max-width: 600px) {
    table[class="email-container"] {
        width: 100% !important;
        max-width: ${mobileWidth}px !important;
    }
    td[class="content-padding"] {
        padding: 20px !important;
    }
    h1 {
        font-size: ${parseInt(mobileFontSize) + 6}px !important;
    }
    h2 {
        font-size: ${parseInt(mobileFontSize) + 4}px !important;
    }
    div, td {
        font-size: ${mobileFontSize}px !important;
        line-height: 1.5 !important;
    }
    img {
        max-width: 150px !important;
        width: 80% !important;
    }
    a[class="button"] {
        padding: 15px 25px !important;
        display: block !important;
        width: 80% !important;
        margin: 20px auto !important;
    }
}
@media only screen and (max-width: 320px) {
    table[class="email-container"] {
        max-width: 280px !important;
    }
    a[class="button"] {
        width: 90% !important;
    }
}
</style>

` + html;
  }

  document.getElementById("generatedCode").value = html;
  document.getElementById("codeOutput").style.display = "flex";
}

function copyCode() {
  const codeTextarea = document.getElementById("generatedCode");
  codeTextarea.select();
  codeTextarea.setSelectionRange(0, 99999);

  try {
    document.execCommand("copy");

    const copyBtn = document.querySelector(".code-header .btn");
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    copyBtn.style.background = "#27ae60";

    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.style.background = "#3498db";
    }, 2000);
  } catch (err) {
    alert("Please manually select and copy the code.");
  }
}

function closeCode() {
  document.getElementById("codeOutput").style.display = "none";
}

// Close modal when clicking outside
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("codeOutput").addEventListener("click", function (e) {
    if (e.target === this) {
      closeCode();
    }
  });
});
