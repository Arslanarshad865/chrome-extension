# SECURESURF AI

## Overview

**SECURERUF AI** is an AI-powered Chrome extension designed to detect phishing URLs and safeguard users from malicious websites. The extension uses a combination of rule-based detection (URL length, domain entropy, HTTP vs. HTTPS) and machine learning to classify URLs as safe or potentially harmful.

## Features

- **Phishing URL Detection**: Identifies phishing attempts based on URL length, domain entropy, suspicious keywords, and insecure HTTP connections.
- **AI-Based Risk Scoring**: Provides a risk score for every URL, helping users assess the danger level of visited websites.
- **Seamless Integration**: Works directly in the browser to offer real-time protection while you browse.

## Installation

1. Clone the repository:

2. Open the Chrome browser and navigate to `chrome://extensions/`.

3. Enable **Developer mode** in the top right corner.

4. Click on **Load unpacked** and select the folder where you cloned the repository.

5. The Securesurf AI extension will now be added to Chrome!

## How to Use

1. Once the extension is installed, click on the Securesurf AI icon in the Chrome toolbar.
2. The extension will automatically analyze the current page's URL and display its risk score in the popup.
3. Securesurf AI will notify you if a URL is potentially harmful based on AI and rule-based analysis.

## Files

- **manifest.json**: Defines the configuration for the Chrome extension.
- **background.js**: Handles background tasks like URL monitoring.
- **popup.html**: Displays the extension UI in a popup window.
- **content.js**: Handles interactions with the web pages.
- **images/**: Contains the extension icons.

## Technologies Used

- **JavaScript**: For extension logic and interaction.
- **Python**: For phishing detection back-end (hosted separately).
- **Chrome Extensions API**: For browser interaction.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to follow the project guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Securesurf AI – Protecting you from phishing attacks in real-time.\_
