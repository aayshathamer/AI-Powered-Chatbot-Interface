document.getElementById("submit-btn").addEventListener("click", function () {
  sendToChatGPT();
});

function sendToChatGPT() {
  let value = document.getElementById("word-input").value;

  let body = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: value }],
    temperature: 1, // fixed typo and changed to number
  };

  let headers = {
    Authorization:
      "Bearer PasteYourApiKeyHere",
    "Content-Type": "application/json",
  };

  axios
    .post("https://api.openai.com/v1/chat/completions", body, { headers })
    .then((response) => {
      let reply = response.data.choices[0].message.content;
      document.getElementById("reply-content").textContent = reply;
    })
    .catch((error) => {
      console.error("Something went wrong:", error);

      if (error.response) {
        document.getElementById("reply-content").textContent =
          "API Error: " + error.response.status + " - " + error.response.data.error.message;
      } else if (error.request) {
        document.getElementById("reply-content").textContent =
          "No response received from API.";
      } else {
        document.getElementById("reply-content").textContent =
          "Error: " + error.message;
      }
    });
}
