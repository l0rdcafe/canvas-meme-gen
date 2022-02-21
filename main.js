document.addEventListener("DOMContentLoaded", () => {
  // html elements
  const canvas = document.querySelector("#canvas");
  const headerInput = document.querySelector("#header");
  const footerInput = document.querySelector("#footer");
  const fileInput = document.querySelector("#file");
  const saveBtn = document.querySelector("#save");
  // canvas 2d context
  const ctx = canvas.getContext("2d");

  // page state
  let imgFile = null;
  let headerText = headerInput.value ?? "";
  let footerText = footerInput.value ?? "";

  // draw dank meme text
  const drawText = () => {
    ctx.font = "30pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = "3";

    ctx.fillText(headerText, canvas.width / 2, 40);
    ctx.strokeText(headerText, canvas.width / 2, 40);
    ctx.fillText(footerText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(footerText, canvas.width / 2, canvas.height - 20);
  };

  // main drawing logic
  const drawMeme = () => {
    if (imgFile == null) {
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(defaultImg, 1, 1, canvas.width, canvas.height);
    } else {
      ctx.drawImage(imgFile, 0, 0, canvas.width, canvas.height);
    }

    drawText();
  };

  // placeholder img used on page load
  const defaultImg = new Image();
  defaultImg.src =
    "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640";
  // draw meme when img loads
  defaultImg.onload = drawMeme;

  // event listeners for input fields
  headerInput.addEventListener("keyup", ({ target: { value } }) => {
    headerText = value;
    drawMeme();
  });

  footerInput.addEventListener("keyup", ({ target: { value } }) => {
    footerText = value;
    drawMeme();
  });

  // img file handler
  fileInput.addEventListener(
    "change",
    (e) => {
      const [file] = e.target.files;
      const reader = new FileReader();
      reader.onload = ({ target: { result } }) => {
        const img = new Image();
        img.src = result;
        imgFile = img;
        img.onload = drawMeme;
      };
      reader.readAsDataURL(file);
    },
    false
  );

  // opens given img in a new tab
  saveBtn.addEventListener(
    "click",
    () => {
      window.open(canvas.toDataURL());
    },
    false
  );
});
