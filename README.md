# 🖐️ SANJOG — The AI Sign Language Arena

> “Because hands can speak louder than words.”  
> **Sanjog** is an AI-powered, multiplayer sign language learning platform that brings gesture recognition, gamification, and voice-assisted tutoring into one smooth, interactive experience.

---

## 🌟 What Is Sanjog?

Sanjog isn’t just another sign language learning app — it’s your personal **AI-powered language playground**.  
Wave your hands, challenge your friends, and let our **AI tutor** guide you with real-time feedback, voice instructions, and joyful encouragement.

### 🎯 The Vision

To make learning sign language **accessible, engaging, and human-like** through modern AI, computer vision, and real-time collaboration.

---

## 🧠 How It Works

### 🚀 The Flow:

1. **Login or Sign Up** — via email or Google.  
2. **Jump into the Dashboard** — choose between practice, challenges, or multiplayer.  
3. **Turn on your webcam** — our AI recognizes your hand gestures in real time.  
4. **Learn, Play & Compete** — earn badges, beat your friends, and level up your signing skills.  
5. **Listen to your AI Tutor** — a friendly voice that encourages, corrects, and motivates you along the way.

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | [Next.js 15+](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [TailwindCSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) + Styled Components |
| **Backend** | [Flask](https://flask.palletsprojects.com/) + [MediaPipe](https://developers.google.com/mediapipe) + OpenCV + NumPy |
| **Database** | [Firebase](https://firebase.google.com/) (Auth + Realtime DB) |
| **Deployment** | Vercel (Frontend) + Render (Backend) |
| **Realtime Communication** | WebSockets / Socket.IO |
| **AI Voice Tutor** | Web Speech API + TTS + Smart Caching |
| **Gesture Model** | Trained via Mediapipe Landmarks + Scikit-learn |

---

## 🖥️ Key Features

### 🎮 **1. Real-Time Gesture Recognition**
- Detects hand gestures via webcam.  
- Optimized for low latency (<100ms).  
- Predicts 36+ signs (A–Z + 0–9).  

### 🤝 **2. Multiplayer Arena**
- Compete against other learners.  
- Real-time scoring, match invites, and live feedback.  
- “Winner takes the bragging rights” 🏆.

### 🗣️ **3. AI Voice Tutor**
- Talks to you — literally.  
- Encourages, guides, and corrects you mid-session.  
- Responds to voice commands like:
  - “Next Sign” → move on  
  - “Repeat” → replay the current lesson  
  - “Show my score” → displays your performance  

### 💬 **4. Community Hub**
- Share progress, badges, and custom sign challenges.  
- Discuss, connect, and learn from peers.  

### 🎨 **5. Gorgeous UI & Smooth UX**
- Persistent sidebar + topbar navigation (like ChatGPT).  
- Preloader animations for every page.  
- Fully responsive design — works beautifully on desktop and tablet.

---

## 🔮 Future Upgrades

| Feature | Description |
|----------|-------------|
| 🧍 Emotion Detection | AI tutor adjusts tone based on confidence/fatigue levels. |
| 🧩 Adaptive Difficulty | Game difficulty scales automatically as you improve. |
| 🌍 Language Packs | Add support for ASL, ISL, and BSL variations. |
| 📱 Mobile App | Built using React Native + TensorFlow Lite. |

---

## 🛠️ Setup Guide

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/yourusername/sanjog.git
cd sanjog

```

🧬 Machine Learning

Built with MediaPipe Hands + Scikit-learn classifier.

Trained on 21-hand landmarks → flattened into 42D feature vector.

Predicts sign labels with >95% accuracy (validated on custom dataset).

Uses caching + smoothing (rolling window) for stable predictions.

💡 Contributing

Got ideas? Found bugs?
Let’s make Sanjog even cooler together 💪

Fork the repo

Create a new branch

Submit a PR with a clear description

🥳 Acknowledgements

Special thanks to:

MediaPipe team for awesome hand tracking

Firebase for smooth auth integration

Flask & Next.js for making AI web dev painless

And you, for believing that AI + accessibility = magic.

🧭 License

MIT License © 2025 — Made with ❤️ by LagnaJit Ghosh

💬 Final Words

“Sanjog means connection — between hands, hearts, and humans.”
Let’s build a world where everyone can communicate freely, one gesture at a time. 🤟

