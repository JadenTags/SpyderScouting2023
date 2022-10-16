function hideElement(elementId) {
    document.getElementById(elementId).style.display = "none";
}

function showElement(elementId, displayType) {
    document.getElementById(elementId).style.display = displayType;

}

function toggleElement(elementId, displayType) {
    if (document.getElementById(elementId).style.display == "none") {
        document.getElementById(elementId).style.display = displayType;
    } else {
        document.getElementById(elementId).style.display = "none";
    }
}