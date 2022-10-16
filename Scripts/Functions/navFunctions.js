function toggleSidebar() {
    if (document.getElementById("sidebarDiv").style.marginLeft == "-250px") {
        document.getElementById("sidebarDiv").style.marginLeft = "0px";
        document.getElementById("menuBars").style.opacity = "0";
        document.getElementById("menuX").style.opacity = "100";
    } else {
        document.getElementById("sidebarDiv").style.marginLeft = "-250px";
        document.getElementById("menuBars").style.opacity = "100";
        document.getElementById("menuX").style.opacity = "0";
    }
}