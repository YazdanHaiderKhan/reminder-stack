// BY AI: This is the complete and final JavaScript code.
// BY AI: Just replace your old 'script.js' file with this one.

// BY ME: Selecting all the necessary DOM elements
let add = document.querySelector("#add");
let main = document.querySelector(".main");
let formContainer = document.querySelector(".formContainer");
const form = document.querySelector("form");
const categoryRadios = form.querySelectorAll("input[name = 'priority']");
let submit = document.querySelector("#submit");
let container = document.querySelector(".container");
let prioritycolors = document.querySelector(".priority-colors");
let cardStack = document.querySelector(".card-area");

// BY ME: Selecting the Up/Down buttons
let UpBtn = document.querySelector("#up");
let DownBtn = document.querySelector("#down");

// BY ME: Selecting the priority filter buttons (dots)
let emergency = document.querySelector("#emergency");
let important = document.querySelector("#important");
let urgent = document.querySelector("#urgent");
let norush = document.querySelector("#norush");

// BY AI: A global variable to track the currently visible card's index
let currentCardIndex = 0;

// BY AI: A function to convert hex color to RGBA for transparent backgrounds
function getRgbaColor(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// BY ME: Function to save a new task to Local Storage
function saveToLocalStorage(obj) {
  if (localStorage.getItem("tasks") === null) {
    let oldTasks = [];
    oldTasks.unshift(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  } else {
    let oldTasks = localStorage.getItem("tasks");
    oldTasks = JSON.parse(oldTasks);
    oldTasks.unshift(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  }
}

// BY ME: Event listener to show the form when the 'Add' button is clicked
add.addEventListener("click", function () {
  main.style.display = "none";
  formContainer.style.display = "flex";
});

// BY ME: Function to go back from the form to the main screen
function goback() {
  formContainer.style.display = "none";
  // BY AI: Changed 'initial' to 'flex' to maintain the side-by-side layout
  main.style.display = "flex";
}

// BY ME: Event listener for the 'Back' button
let back = document.querySelector(".back");
back.addEventListener("click", function () {
  goback();
});

// BY AI: A function to update card visibility and control the animation.
// BY AI: This function is the central point of control for the card stack.
function updateCardVisibilityAndAnimate(direction) {
  const cards = container.querySelectorAll(".card");

  // BY AI: Animate the outgoing card
  const outgoingCard = cards[currentCardIndex - direction];
  if (outgoingCard) {
    outgoingCard.style.opacity = "0";
    outgoingCard.style.transform = `translateY(${
      direction === 1 ? "20px" : "-20px"
    })`;
  }

  // BY AI: Use a small delay to allow the fade-out to start before the new card appears.
  setTimeout(() => {
    // BY AI: Loop through all cards to hide the old ones and show the new one
    cards.forEach((card, index) => {
      if (index === currentCardIndex) {
        // BY AI: Show the new card
        card.style.display = "block";
        card.style.opacity = "0"; // BY AI: Set initial opacity to 0 for a fade-in animation
        card.style.transform = `translateY(${
          direction === 1 ? "-20px" : "20px"
        })`;

        // BY AI: This line forces the browser to re-render, which is crucial for the animation.
        void card.offsetWidth;

        // BY AI: Animate the new card into view
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      } else {
        card.style.display = "none"; // BY AI: Hide all other cards
      }
    });

    // BY AI: Disable the navigation buttons at the start and end of the stack
    UpBtn.disabled = currentCardIndex === 0;
    DownBtn.disabled = currentCardIndex === cards.length - 1;
  }, 10);
}

// BY ME: A function to create and show cards on the screen
function showcard(data) {
    const existingCards = container.querySelectorAll(".card");
    existingCards.forEach(card => card.remove());
    const nocardMessage = document.querySelector(".nocard");

    // A map to link priority names to their colors
    const priorityColors = {
        "Emergency": "#000000",
        "Important": "#8b5cf6",
        "Urgent": "#f59e0b",
        "No Rush": "teal"
    };

    if (!data || data.length === 0) {
        nocardMessage.textContent = "No cards";
        nocardMessage.style.display = "initial";
        UpBtn.disabled = true;
        DownBtn.disabled = true;
        return;
    } else {
        nocardMessage.style.display = "none";
    }

    data.forEach(item => {
        let card = document.createElement("div");
        let img = document.createElement("img");
        let h2 = document.createElement("h2");
        let content = document.createElement("div");
        let phometown = document.createElement("p");
        phometown.textContent = "Hometown";
        let spanhometown = document.createElement("span");
        let pbookings = document.createElement("p");
        pbookings.textContent = "Bookings";
        let spanbookings = document.createElement("span");
        spanbookings.textContent = "0";
        let actions = document.createElement("div");
        let call = document.createElement("button");
        call.classList.add("call");
        let message = document.createElement("button");
        message.classList.add("message");

        img.setAttribute("src", item.imgurl);
        img.classList.add("profilepic");
        h2.textContent = item.fullName;
        spanhometown.textContent = item.hometown;
        call.textContent = "Call";
        message.textContent = "Message";

        // Check if the item has a selected priority
        const color = priorityColors[item.selected];
        if (color) {
            const rgbaColor = getRgbaColor(color, 0.2);
            // card.style.backgroundColor = rgbaColor;
            card.style.backdropFilter = `blur(10px)`;
            card.style.border = `2px solid ${color}`; // Use the correct color
            card.style.boxShadow = `0 4px 8px rgba(0, 0, 0, 0.1)`;
        } else {
            // Default styling if no priority is selected
            card.style.border = "2px solid rgba(204, 204, 204, 0.5)";
            card.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
            card.style.backdropFilter = `blur(10px)`;
            card.style.boxShadow = `0 4px 8px rgba(0, 0, 0, 0.1)`;
        }

        phometown.append(spanhometown);
        phometown.classList.add("content", "p");
        pbookings.append(spanbookings);
        pbookings.classList.add("content", "p");
        content.append(phometown, pbookings);
        content.classList.add("content");
        actions.append(call, message);
        actions.classList.add("actions");
        card.append(img, h2, content, actions);
        card.classList.add("card");
        container.append(card);
    });
    
    currentCardIndex = 0;
    updateCardVisibilityAndAnimate(0);
}

// BY ME: Event listener for form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const fullName = document.querySelector("#name").value;
  const hometown = document.querySelector("#hometown").value;
  const imgurl = document.querySelector("#profile").value;
  let selected;
  categoryRadios.forEach(function (cat) {
    if (cat.checked) {
      selected = cat.value;
    }
  });
  const formData = {
    fullName,
    hometown,
    imgurl,
    selected,
  };
  saveToLocalStorage(formData);
  form.reset();
  let updatedTasks = JSON.parse(localStorage.getItem("tasks"));
  showcard(updatedTasks);
  goback();
});

// BY ME: Up button event listener
UpBtn.addEventListener("click", () => {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    // BY AI: Call the animation function to move the card
    updateCardVisibilityAndAnimate(-1);
  }
});

// BY ME: Down button event listener
DownBtn.addEventListener("click", () => {
  const cards = container.querySelectorAll(".card");
  if (currentCardIndex < cards.length - 1) {
    currentCardIndex++;
    // BY AI: Call the animation function to move the card
    updateCardVisibilityAndAnimate(1);
  }
});

// BY ME: Function to filter and show cards by priority
function filterAndShow(priority) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks === null || tasks.length === 0) {
    showcard([]);
    return;
  }
  const filteredTasks = tasks.filter(function (task) {
    return task.selected === priority;
  });
  // BY AI: Reset index to 0 when showing filtered cards
  currentCardIndex = 0;
  showcard(filteredTasks);
}

// BY ME: Event listeners for the priority filter buttons
emergency.addEventListener("click", function () {
  filterAndShow("Emergency");
});
important.addEventListener("click", function () {
  filterAndShow("Important");
});
urgent.addEventListener("click", function () {
  filterAndShow("Urgent");
});
norush.addEventListener("click", function () {
  filterAndShow("No Rush");
});

// BY AI: This is the initial call that starts the application.
// BY AI: It must be at the very end of the script to avoid ReferenceErrors.
let tasks = JSON.parse(localStorage.getItem("tasks"));
showcard(tasks);
