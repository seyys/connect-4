function resizeImage(base64Str, maxWidth = 256, maxHeight = 256) {
  return new Promise((resolve) => {
    let img = new Image()
    img.src = base64Str
    img.onload = () => {
      let canvas = document.createElement('canvas')
      const MAX_WIDTH = maxWidth
      const MAX_HEIGHT = maxHeight
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height
          height = MAX_HEIGHT
        }
      }
      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL())
    }
  })
}

function AvatarUploader({ avatarChangedFlag, setAvatarChangedFlag, children }) {
  const dragOver = (e) => {
    e.preventDefault();
  }

  const drop = (e) => {
    e.preventDefault();
    let avatar;
    if(e.type === "change") avatar = e.target.files[0];
    if(e.type === "drop") avatar = e.dataTransfer.files[0];
    if (!avatar) {
      return;
    }

    if (!avatar.type.includes("image")) {
      return;
    }

    const reader = new FileReader()
    reader.onload = async (event) => {
      const compressedImg = await resizeImage(event.target.result);
      localStorage.setItem("avatar", JSON.stringify(compressedImg));
      setAvatarChangedFlag(!avatarChangedFlag);
    }

    reader.readAsDataURL(avatar);
  }

  return (
    <div onDragOver={(e) => dragOver(e)} onDrop={(e) => drop(e)}>
      <label>
        {children}      
        <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => drop(e)} />
      </label>
    </div>
  )
}

export default AvatarUploader;