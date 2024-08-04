const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

function verifyTextLength(e) {
  const textarea = e.target;
  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function submitData(e) {
  submitButton.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch('https://d5e3069a-e060-49d1-8844-171958e82b07-00-3863q4vfykgoo.pike.replit.dev/summarize', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.text();
    })
    .then(summary => {
      summarizedTextArea.value = summary;
      submitButton.classList.remove("submit-button--loading");
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      submitButton.classList.remove("submit-button--loading");
      alert('An error occurred: ' + error.message);
    });
}
