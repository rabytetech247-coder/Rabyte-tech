// Frontend Auth Logic

document.addEventListener("DOMContentLoaded", async () => {
  
  // --- 1. Login Form ---
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const errorMsg = document.getElementById("error-message");
      
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        
        if (data.success) {
          // If they need to reset their temporary password
          if (data.needs_password_reset) {
            document.getElementById("change-password-modal").style.display = "grid";
          } else {
            // Redirect based on role
            window.location.href = data.user.role === 'admin' ? "/admin/index.html" : "/user/dashboard.html";
          }
        } else {
          errorMsg.textContent = data.error || "Login failed";
          errorMsg.style.display = "block";
        }
      } catch (err) {
        errorMsg.textContent = "Network error. Please try again.";
        errorMsg.style.display = "block";
      }
    });
  }

  // --- 2. Registration Form ---
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("reg-name").value;
      const email = document.getElementById("reg-email").value;
      const username = document.getElementById("reg-username").value;
      const password = document.getElementById("reg-password").value;
      const errorMsg = document.getElementById("register-error");
      
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, username, password })
        });
        const data = await res.json();
        
        if (data.success) {
          alert("Registration successful! You can now log in.");
          window.location.href = "/auth/login.html";
        } else {
          errorMsg.textContent = data.error || "Registration failed";
          errorMsg.style.display = "block";
        }
      } catch (err) {
        errorMsg.textContent = "Network error.";
        errorMsg.style.display = "block";
      }
    });
  }

  // --- 3. Forgot Password Form ---
  const forgotForm = document.getElementById("forgot-form");
  if (forgotForm) {
    forgotForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("forgot-email").value;
      const errorMsg = document.getElementById("forgot-error");
      
      try {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });
        
        // Hide form, show success (we always show success for privacy)
        document.getElementById("forgot-card").style.display = "none";
        document.getElementById("forgot-success").style.display = "block";
      } catch (err) {
        errorMsg.textContent = "Network error.";
        errorMsg.style.display = "block";
      }
    });
  }

  // --- 4. Change Password Form (Inside Login Page) ---
  const cpForm = document.getElementById("change-password-form");
  if (cpForm) {
    cpForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const newPassword = document.getElementById("cp-new").value;
      const confirmPassword = document.getElementById("cp-confirm").value;
      const errorMsg = document.getElementById("cp-error");
      
      if (newPassword !== confirmPassword) {
        errorMsg.textContent = "Passwords do not match.";
        errorMsg.style.display = "block";
        return;
      }
      
      try {
        const res = await fetch("/api/auth/change-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword })
        });
        const data = await res.json();
        
        if (data.success) {
          // Successfully changed, verify auth to get role and redirect
          const meRes = await fetch("/api/auth/me");
          const meData = await meRes.json();
          if (meData.user) {
            window.location.href = meData.user.role === 'admin' ? "/admin/index.html" : "/user/dashboard.html";
          } else {
            window.location.href = "/";
          }
        } else {
          errorMsg.textContent = data.error || "Failed to change password";
          errorMsg.style.display = "block";
        }
      } catch (err) {
        errorMsg.textContent = "Network error.";
        errorMsg.style.display = "block";
      }
    });
  }
});

// Global Header Auth Check
window.updateAuthState = async function(authContainer) {
  if (!authContainer) return;
  try {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    if (data.user) {
      const dashboardLink = data.user.role === 'admin' ? '/admin/index.html' : '/user/dashboard.html';
      authContainer.innerHTML = `
        <a href="${dashboardLink}" class="btn-cta" style="background:#f1f5f9; color:#111; padding:11px 16px;">Dashboard</a>
        <button onclick="logout()" class="btn-cta" style="background: #ef4444; border: none; cursor: pointer; padding:11px 16px;">Logout</button>
      `;
    }
  } catch (e) { }
};

window.logout = async function() {
  document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/";
};
