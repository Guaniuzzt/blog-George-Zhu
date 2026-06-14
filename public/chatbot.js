console.log("Simulated Chatbot script loaded");

window.initializeChatbot = () => {
  // ===== FLOATING BUTTON =====
  const button = document.createElement("div");
  button.textContent = "💬";
  Object.assign(button.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "48px",
    height: "48px",
    backgroundColor: "var(--accent)",
    color: "#fff",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    zIndex: "9999",
    boxShadow: "0 0 20px var(--accent-glow), 0 4px 16px rgba(0,0,0,0.25)",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fontFamily: '"Satoshi", system-ui, sans-serif',
  });

  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.1)";
    button.style.boxShadow = "0 0 32px var(--accent-glow), 0 6px 24px rgba(0,0,0,0.35)";
  });
  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)";
    button.style.boxShadow = "0 0 20px var(--accent-glow), 0 4px 16px rgba(0,0,0,0.25)";
  });

  // ===== CLICK -> TOGGLE POPUP =====
  button.addEventListener("click", () => {
    const existing = document.getElementById("chatbot-popup");
    if (existing) {
      existing.style.opacity = "0";
      existing.style.transform = "translateY(8px) scale(0.96)";
      setTimeout(() => existing.remove(), 200);
      return;
    }

    const popup = document.createElement("div");
    popup.id = "chatbot-popup";
    Object.assign(popup.style, {
      position: "fixed",
      bottom: "88px",
      right: "24px",
      width: "340px",
      height: "440px",
      backgroundColor: "var(--card-bg)",
      borderRadius: "16px",
      border: "1px solid var(--border-color)",
      boxShadow: "0 16px 48px rgba(0,0,0,0.35), 0 0 0 1px var(--border-color)",
      zIndex: "9999",
      display: "flex",
      flexDirection: "column",
      fontFamily: '"Satoshi", system-ui, sans-serif',
      opacity: "0",
      transform: "translateY(8px) scale(0.96)",
      transition: "opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      overflow: "hidden",
    });

    // Animate in
    requestAnimationFrame(() => {
      popup.style.opacity = "1";
      popup.style.transform = "translateY(0) scale(1)";
    });

    // ===== HEADER =====
    const header = document.createElement("div");
    Object.assign(header.style, {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 16px 12px",
      borderBottom: "1px solid var(--border-color)",
    });
    header.innerHTML = `
      <span style="font-family:'Clash Display', sans-serif; font-weight:600; font-size:16px; font-size:16px; background:var(--gradient-1); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; letter-spacing:-0.02em;">
        Chatbot
      </span>
      <span id="chatbot-close" style="cursor:pointer; font-size:18px; color:var(--text-muted); transition:color 0.2s; line-height:1;">✕</span>
    `;
    header.querySelector("#chatbot-close")?.addEventListener("mouseenter", (e) => {
      e.target.style.color = "var(--accent)";
    });
    header.querySelector("#chatbot-close")?.addEventListener("mouseleave", (e) => {
      e.target.style.color = "var(--text-muted)";
    });
    header.querySelector("#chatbot-close")?.addEventListener("click", () => {
      popup.style.opacity = "0";
      popup.style.transform = "translateY(8px) scale(0.96)";
      setTimeout(() => popup.remove(), 200);
    });

    // ===== MESSAGES AREA =====
    const messages = document.createElement("div");
    messages.id = "chatbot-messages";
    Object.assign(messages.style, {
      flex: "1",
      overflowY: "auto",
      padding: "12px 16px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      backgroundColor: "var(--bg-secondary)",
    });
    messages.innerHTML = `
      <div style="text-align:center; color:var(--text-muted); font-size:13px; margin-top:32px;">
        👋 How can I help you today?
      </div>
    `;

    // ===== INPUT AREA =====
    const inputWrap = document.createElement("div");
    Object.assign(inputWrap.style, {
      padding: "12px 16px",
      borderTop: "1px solid var(--border-color)",
      backgroundColor: "var(--card-bg)",
    });

    const input = document.createElement("input");
    input.id = "chatbot-input";
    input.type = "text";
    input.placeholder = "Type a message...";
    Object.assign(input.style, {
      width: "100%",
      padding: "10px 14px",
      border: "1px solid var(--border-color)",
      borderRadius: "10px",
      fontSize: "14px",
      outline: "none",
      boxSizing: "border-box",
      fontFamily: '"Satoshi", system-ui, sans-serif',
      backgroundColor: "var(--bg-secondary)",
      color: "var(--text-primary)",
      transition: "border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    });
    input.addEventListener("focus", () => {
      input.style.borderColor = "var(--accent)";
      input.style.boxShadow = "0 0 0 3px var(--accent-glow)";
    });
    input.addEventListener("blur", () => {
      input.style.borderColor = "var(--border-color)";
      input.style.boxShadow = "none";
    });

    // Enter to send
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && input.value.trim()) {
        const text = input.value.trim();
        input.value = "";

        // Remove placeholder if present
        const placeholder = messages.querySelector(".chatbot-placeholder");
        if (placeholder) placeholder.remove();

        // User message
        const msg = document.createElement("div");
        msg.textContent = text;
        Object.assign(msg.style, {
          alignSelf: "flex-end",
          maxWidth: "80%",
          padding: "10px 14px",
          borderRadius: "12px 12px 4px 12px",
          fontSize: "14px",
          lineHeight: "1.5",
          wordBreak: "break-word",
          backgroundColor: "var(--accent)",
          color: "#fff",
          boxShadow: "0 2px 8px var(--accent-glow)",
        });
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;

        // Bot reply (simulated)
        setTimeout(() => {
          const reply = document.createElement("div");
          reply.textContent = "Thanks for your message! This is a demo chatbot.";
          Object.assign(reply.style, {
            alignSelf: "flex-start",
            maxWidth: "80%",
            padding: "10px 14px",
            borderRadius: "12px 12px 12px 4px",
            fontSize: "14px",
            lineHeight: "1.5",
            wordBreak: "break-word",
            backgroundColor: "var(--bg-tertiary)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-color)",
          });
          messages.appendChild(reply);
          messages.scrollTop = messages.scrollHeight;
        }, 600);
      }
    });

    inputWrap.appendChild(input);

    // ===== ASSEMBLE =====
    popup.appendChild(header);
    popup.appendChild(messages);
    popup.appendChild(inputWrap);

    // Click outside to close
    const clickOutside = (e) => {
      if (!popup.contains(e.target) && e.target !== button) {
        popup.style.opacity = "0";
        popup.style.transform = "translateY(8px) scale(0.96)";
        setTimeout(() => popup.remove(), 200);
        document.removeEventListener("click", clickOutside);
      }
    };
    setTimeout(() => document.addEventListener("click", clickOutside), 0);

    document.body.appendChild(popup);
    setTimeout(() => input.focus(), 300);
  });

  document.body.appendChild(button);
};
