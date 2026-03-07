document.addEventListener('DOMContentLoaded', () => {
  const panel = document.getElementById('chatPanel');
  const btn   = document.getElementById('aiBtn');
  const input = document.getElementById('chatInput');
  const msgs  = document.getElementById('messages');
  const send  = document.getElementById('sendBtn');

function addMsg(text, role) {
  const d = document.createElement('div');
  d.className = `msg ${role}`;
  d.textContent = text;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const d = document.createElement('div');
  d.className = 'msg typing';
  d.id = 'ai-typing';
  d.innerHTML = '<div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div>';
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
  return d;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  addMsg(text, 'user');
  input.value = '';

  const typingEl = showTyping();

  try {
    const res = await fetch('/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, role: "user" })
    });
    const data = await res.json();
    typingEl.remove();
    addMsg(data.text, 'bot');
  } catch {
    typingEl.remove();
    addMsg('Something went wrong.', 'bot');
  }
}

  btn.addEventListener('click', () => panel.classList.toggle('open'));
  send.addEventListener('click', sendMessage);
  input.addEventListener('keydown', e => e.key === 'Enter' && sendMessage());
});