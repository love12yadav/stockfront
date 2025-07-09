# 🎯 Stock Price Notifier – Frontend

A sleek and responsive **React-based frontend** for the Stock Price Notifier application. Users can register stock price alerts and receive **real-time notifications** via **WebSocket** and **email**, integrated with a Spring Boot + Kafka backend.

> 🔗 **Backend Repo**: [love12yadav/stockbackend](https://github.com/love12yadav/stockbackend)

---

## 🚀 Features

- 📝 Register alerts (stock symbol, price, condition, email)
- 🌐 Connects to WebSocket for real-time stock price breach notifications
- 🔔 Displays instant in-app toasts when stock crosses alert threshold
- 📦 Fetches and displays saved alerts from backend
- ⚙️ Axios-based API integration

---

## 🧩 Tech Stack

| Layer       | Technology            |
|-------------|------------------------|
| Frontend    | React + Vite           |
| UI Styling  | Tailwind CSS           |
| API Calls   | Axios                  |
| Realtime    | WebSocket              |
| Notifications | React-Toastify       |

---

---

## ⚙️ How It Works

1. 🌐 User enters stock symbol, email, threshold, and condition (above/below)
2. 📤 Frontend sends this data to backend via REST API
3. 💾 Backend saves it to MySQL and listens for price updates via Kafka
4. 📡 If threshold is breached:
   - 📬 Email is sent to user
   - 🔔 WebSocket pushes real-time notification to frontend
5. 🔄 Frontend displays a toast with stock update

---

## 🧪 Sample WebSocket Message

json
{
  "symbol": "AAPL",
  "price": 180.0,
  "message": "AAPL has crossed your alert threshold"
}
