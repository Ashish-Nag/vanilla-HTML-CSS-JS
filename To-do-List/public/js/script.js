function emptyInput() {
    const inputItem = document.getElementById("newPostItem").value;

    if (inputItem == '') {
        alert("enter a valid reminder");
        return false;
    }
}
