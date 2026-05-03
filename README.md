***

```markdown
# VERACITY AI: Fake News Detection Framework

![Version](https://img.shields.io/badge/version-v1.0.2-darkred)
![Status](https://img.shields.io/badge/status-active-success)

Veracity AI is a sleek, AI-powered web application designed to analyze text excerpts, claims, and news headlines to determine their authenticity. Built with React and powered by the Google Gemini API, this framework provides users with an instant classification verdict, a confidence score, and a highly detailed contextual analysis.

**Developed by Nitin Kumar Saini**

---

## 📸 Preview
![Veracity AI Interface](./src/Fake%20News%20Detection%20Framework.jpeg)

---

## ✨ Features

*   **Real-Time Text Stream Analysis:** Paste any suspicious text, news claim, or forward into the input field for instant verification.
*   **AI-Powered Classification:** Leverages the Gemini API to understand context, identify logical fallacies, and flag improbable claims.
*   **Verdict & Confidence Scoring:** Returns a clear, bold classification (e.g., **FAKE** or **REAL**) alongside a percentage-based confidence score.
*   **In-Depth Analysis Explanation:** Doesn't just give a yes/no answer—generates a comprehensive breakdown explaining exactly *why* a claim is deemed true or false based on real-world facts.
*   **Editorial UI Design:** Features a premium, minimalist, newspaper-inspired user interface for a professional analytical experience.

## 🛠️ Technologies Used

*   **Frontend Framework:** React with Vite
*   **Language:** TypeScript
*   **AI Engine:** Google Gemini API (`geminiService.ts`)
*   **Styling:** CSS / Tailwind CSS 

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

*   Node.js installed on your machine
*   A Google Gemini API Key

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/nitinsaini1805/fake-news-detection-system.git](https://github.com/nitinsaini1805/fake-news-detection-system.git)
   cd fake-news-detection-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   * Create a new file named `.env` in the root directory of your project.
   * Add your Gemini API key to this file:
     ```env
     GEMINI_API_KEY=your_actual_api_key_here
     ```
   *(Security Note: The `.env` file is included in `.gitignore` to prevent your API key from being exposed on GitHub).*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 👨‍💻 Author

**Nitin Kumar Saini**
*   GitHub: [@nitinsaini1805](https://github.com/nitinsaini1805)

## 📝 License

This project is for educational and portfolio purposes. 
```

***

Once you have pasted this into your `README.md` and saved it, run these commands in your terminal to update GitHub:

```bash
git add .
git commit -m "Added complete README with preview image"
git push
```