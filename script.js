body {
  font-family: Arial, sans-serif;
  background: #eef1f5;
  margin: 0;
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: auto;
  background: #ffffff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  animation: fadeIn 0.4s ease;
}

h2 {
  text-align: center;
  font-size: 26px;
  margin-bottom: 25px;
  color: #0a4fa3;
}

label {
  display: block;
  margin-top: 15px;
  font-weight: bold;
  color: #333;
}

input, textarea {
  width: 100%;
  padding: 12px;
  margin-top: 6px;
  border-radius: 8px;
  border: 1px solid #bfc6d1;
  font-size: 15px;
  transition: 0.3s;
}

input:focus, textarea:focus {
  border-color: #0a7bf2;
  box-shadow: 0 0 5px rgba(10, 123, 242, 0.4);
  outline: none;
}

button {
  width: 100%;
  padding: 14px;
  margin-top: 25px;
  background: linear-gradient(90deg, #0a7bf2, #0662c4);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

.success {
  margin-top: 20px;
  color: #1a8f3c;
  font-weight: bold;
  text-align: center;
  display: none;
  font-size: 16px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
