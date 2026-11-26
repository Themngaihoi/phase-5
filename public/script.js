
const form = document.getElementById("question-form");
const questionInput = document.getElementById("question");
const submitButton = document.getElementById("submit-btn");
const answerBox = document.getElementById("answer-box");
const answerText = document.getElementById("answer");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const question = questionInput.value.trim();

  if (!question) return;

  submitButton.disabled = true;
  submitButton.textContent = "Thinking...";
  answerBox.hidden = false;
  answerText.textContent = "Getting your answer...";

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    answerText.textContent = data.answer || "No answer was returned.";
  } catch (error) {
    answerText.textContent = error.message;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Ask Gemini";
  }
});
