let menu = document.querySelector('.menu')
let sidebar = document.querySelector('.Sidebar')
let mainContent = document.querySelector('.MainContent')

menu.onclick = function() {
    sidebar.classList.toggle('active')
    mainContent.classList.toggle('active')
}