// // Initialize Firebase services
// const db = firebase.firestore();
// const auth = firebase.auth();

// // Elements
// const userEmail = document.getElementById("userEmail");
// const ideaTitle = document.getElementById("ideaTitle");
// const ideaDescription = document.getElementById("ideaDescription");
// const ideaCategory = document.getElementById("ideaCategory");
// const status = document.getElementById("status");
// const ideasList = document.getElementById("ideasList");

// // Logout Function
// function logout() {
//   auth.signOut()
//     .then(() => {
//       window.location.href = "index.html";
//     })
//     .catch((error) => {
//       console.error("Logout error:", error);
//     });
// }

// // Save Idea Function
// function saveIdea() {
//   const user = auth.currentUser;

//   if (!user) {
//     status.textContent = "Please sign in first!";
//     status.style.color = "red";
//     return;
//   }

//   if (!ideaTitle.value || !ideaDescription.value) {
//     status.textContent = "Please fill in title and description";
//     status.style.color = "red";
//     return;
//   }

//   db.collection("ideas").add({
//     uid: user.uid,
//     email: user.email,
//     title: ideaTitle.value,
//     description: ideaDescription.value,
//     category: ideaCategory.value || "General",
//     createdAt: firebase.firestore.FieldValue.serverTimestamp()
//   })
//   .then(() => {
//     status.textContent = "💡 Idea saved successfully!";
//     status.style.color = "limegreen";
//     clearForm();
//     loadIdeas();

//     setTimeout(() => {
//       status.textContent = "";
//     }, 3000);
//   })
//   .catch((error) => {
//     console.error("Error saving idea:", error);
//     status.textContent = "⚠️ Failed to save idea!";
//     status.style.color = "red";
//   });
// }

// // Clear Form Function
// function clearForm() {
//   ideaTitle.value = "";
//   ideaDescription.value = "";
//   ideaCategory.value = "";
// }

// // Load Ideas Function
// function loadIdeas() {
//   const user = auth.currentUser;
//   if (!user) return;

//   db.collection("ideas")
//     .where("uid", "==", user.uid)
//     .orderBy("createdAt", "desc")
//     .get()
//     .then((querySnapshot) => {
//       if (querySnapshot.empty) {
//         ideasList.innerHTML = '<p class="text-white/60 text-center py-8">No ideas yet. Create your first one above!</p>';
//         return;
//       }

//       ideasList.innerHTML = "";
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         const ideaCard = document.createElement("div");
//         ideaCard.className = "bg-white/10 rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all";
//         ideaCard.innerHTML = `
//           <div class="flex justify-between items-start mb-3">
//             <h4 class="text-xl font-bold text-white">${escapeHtml(data.title)}</h4>
//             <button onclick="deleteIdea('${doc.id}')" class="text-red-400 hover:text-red-300 transition-all">
//               🗑️
//             </button>
//           </div>
//           <p class="text-white/80 mb-3">${escapeHtml(data.description)}</p>
//           <div class="flex items-center justify-between">
//             <span class="text-xs bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full border border-purple-400/30">
//               ${escapeHtml(data.category)}
//             </span>
//             <span class="text-xs text-white/50">
//               ${data.createdAt ? new Date(data.createdAt.toDate()).toLocaleDateString() : 'Just now'}
//             </span>
//           </div>
//         `;
//         ideasList.appendChild(ideaCard);
//       });
//     })
//     .catch((error) => {
//       console.error("Error loading ideas:", error);
//     });
// }

// // Delete Idea Function
// function deleteIdea(id) {
//   if (!confirm("Are you sure you want to delete this idea?")) return;

//   db.collection("ideas").doc(id).delete()
//     .then(() => {
//       status.textContent = "🗑️ Idea deleted!";
//       status.style.color = "orange";
//       loadIdeas();
//       setTimeout(() => {
//         status.textContent = "";
//       }, 3000);
//     })
//     .catch((error) => {
//       console.error("Error deleting idea:", error);
//       status.textContent = "⚠️ Failed to delete idea!";
//       status.style.color = "red";
//     });
// }

// // Helper function to escape HTML and prevent XSS
// function escapeHtml(text) {
//   const div = document.createElement('div');
//   div.textContent = text;
//   return div.innerHTML;
// }

// // Auth State Observer
// auth.onAuthStateChanged((user) => {
//   if (user) {
//     userEmail.textContent = user.email;
//     loadIdeas();
//   } else {
//     window.location.href = "index.html";
//   }
// });
// ===============================
// 🔥 FIREBASE INITIALIZATION
// ===============================
const db = firebase.firestore();
const auth = firebase.auth();

// ===============================
// 🎯 ELEMENT REFERENCES
// ===============================
const userEmail = document.getElementById("userEmail");
const ideaTitle = document.getElementById("ideaTitle");
const ideaDescription = document.getElementById("ideaDescription");
const ideaCategory = document.getElementById("ideaCategory");
const status = document.getElementById("status");
const ideasList = document.getElementById("ideasList");

// ===============================
// 🚪 LOGOUT FUNCTION
// ===============================
function logout() {
  auth.signOut()
    .then(() => window.location.href = "index.html")
    .catch((error) => console.error("Logout error:", error));
}

// ===============================
// 💾 CREATE (SAVE) IDEA
// ===============================
function saveIdea() {
  const user = auth.currentUser;

  if (!user) return showStatus("Please sign in first!", "red");
  if (!ideaTitle.value || !ideaDescription.value)
    return showStatus("Please fill in title and description", "red");

  db.collection("ideas").add({
    uid: user.uid,
    email: user.email,
    title: ideaTitle.value,
    description: ideaDescription.value,
    category: ideaCategory.value || "General",
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    showStatus("💡 Idea saved successfully!", "limegreen");
    clearForm();
  })
  .catch((error) => {
    console.error("Error saving idea:", error);
    showStatus("⚠️ Failed to save idea!", "red");
  });
}

// ===============================
// 📖 READ (LOAD) IDEAS
// ===============================
function loadIdeas() {
  const user = auth.currentUser;
  if (!user) return;

  db.collection("ideas")
    .where("uid", "==", user.uid)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        ideasList.innerHTML = '<p class="text-white/60 text-center py-8">No ideas yet. Create your first one above!</p>';
        return;
      }

      ideasList.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const ideaCard = document.createElement("div");
        ideaCard.className = "bg-white/10 rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all";
        ideaCard.innerHTML = `
          <div class="flex justify-between items-start mb-3">
            <h4 class="text-xl font-bold text-white">${escapeHtml(data.title)}</h4>
            <button onclick="deleteIdea('${doc.id}')" class="text-red-400 hover:text-red-300 transition-all">
              🗑️
            </button>
          </div>
          <p class="text-white/80 mb-3">${escapeHtml(data.description)}</p>
          <div class="flex items-center justify-between">
            <span class="text-xs bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full border border-purple-400/30">
              ${escapeHtml(data.category)}
            </span>
            <span class="text-xs text-white/50">
              ${data.createdAt ? new Date(data.createdAt.toDate()).toLocaleDateString() : 'Just now'}
            </span>
          </div>
        `;
        ideasList.appendChild(ideaCard);
      });
    })
    .catch((error) => {
      console.error("Error loading ideas:", error);
    });
}

// ===============================
// ✏️ UPDATE IDEA
// ===============================
function editIdea(id, oldTitle, oldDescription, oldCategory) {
  const newTitle = prompt("Edit title:", oldTitle);
  const newDesc = prompt("Edit description:", oldDescription);
  const newCat = prompt("Edit category:", oldCategory);

  if (!newTitle || !newDesc) {
    alert("Title and description cannot be empty.");
    return;
  }

  db.collection("ideas").doc(id).update({
    title: newTitle,
    description: newDesc,
    category: newCat || "General",
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => showStatus("✏️ Idea updated successfully!", "yellow"))
  .catch((error) => {
    console.error("Error updating idea:", error);
    showStatus("⚠️ Failed to update idea!", "red");
  });
}

// ===============================
// 🗑️ DELETE IDEA
// ===============================
function deleteIdea(id) {
  if (!confirm("Are you sure you want to delete this idea?")) return;

  db.collection("ideas").doc(id).delete()
    .then(() => showStatus("🗑️ Idea deleted!", "orange"))
    .catch((error) => {
      console.error("Error deleting idea:", error);
      showStatus("⚠️ Failed to delete idea!", "red");
    });
}

// ===============================
// 🧹 HELPER FUNCTIONS
// ===============================
function clearForm() {
  ideaTitle.value = "";
  ideaDescription.value = "";
  ideaCategory.value = "";
}

function showStatus(msg, color) {
  status.textContent = msg;
  status.style.color = color;
  setTimeout(() => (status.textContent = ""), 3000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ===============================
// 👀 AUTH STATE LISTENER
// ===============================
auth.onAuthStateChanged((user) => {
  if (user) {
    userEmail.textContent = user.email;
    loadIdeas();
  } else {
    window.location.href = "index.html";
  }
});













