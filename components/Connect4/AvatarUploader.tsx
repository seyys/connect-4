function AvatarUploader({ avatarChangedFlag, setAvatarChangedFlag, children }) {
    const dragOver = (e) => {
        e.preventDefault();
    }

    const drop = (e) => {
        e.preventDefault();
        const avatar = e.dataTransfer.files[0];
        if (!avatar) {
            return;
        }

        if (!avatar.type.includes("image")) {
            return;
        }

        const reader = new FileReader()
        reader.onload = event => {
            localStorage.setItem("avatar", JSON.stringify(event.target.result));
            setAvatarChangedFlag(!avatarChangedFlag);
        }

        reader.readAsDataURL(avatar);
    }

return (
    <div onDragOver={(e) => dragOver(e)} onDrop={(e) => drop(e)}>
        {children}
    </div>
)
}

export default AvatarUploader;