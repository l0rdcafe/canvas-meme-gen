document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("#canvas");
  const headerInput = document.querySelector("#header");
  const footerInput = document.querySelector("#footer");
  const fileInput = document.querySelector("#file");
  const saveBtn = document.querySelector("#save");
  const ctx = canvas.getContext("2d");

  let imgFile = null;
  let headerText = "";
  let footerText = "";

  const drawText = () => {
    ctx.font = "36pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = "3";

    ctx.fillText(headerText, canvas.width / 2, 40);
    ctx.strokeText(headerText, canvas.width / 2, 40);
    ctx.fillText(footerText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(footerText, canvas.width / 2, canvas.height - 20);
  };

  const drawMeme = (img) => {
    if (img == null) {
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    drawText();
  };

  headerInput.addEventListener("keyup", ({ target: { value } }) => {
    headerText = value;
    drawMeme(imgFile);
  });

  footerInput.addEventListener("keyup", ({ target: { value } }) => {
    footerText = value;
    drawMeme(imgFile);
  });

  fileInput.addEventListener(
    "change",
    (e) => {
      const [file] = e.target.files;
      console.log({ file });
      const reader = new FileReader();
      reader.onload = ({ target: { result } }) => {
        const img = new Image();
        img.onload = () => {
          drawMeme(img);
        };
        img.src = result;
        imgFile = img;
      };
      reader.readAsDataURL(file);
    },
    false
  );

  saveBtn.addEventListener(
    "click",
    () => {
      window.open(canvas.toDataURL());
    },
    false
  );

  drawMeme(imgFile, headerText, footerText);
});
