import { useRef } from "react";

function handleMenuClick() {
    let sidebar = document.querySelector('.Sidebar')
    let mainContent = document.querySelector('.MainContent')
    sidebar.classList.toggle('active')
    mainContent.classList.toggle('active')
}
const Header = () => {
    return (
        <section className="Header">
            <div className="logo">
                <i className="ri-menu-line icon icon-0 menu" onClick={ handleMenuClick}></i>
                <h2>R<span>MS</span></h2>
            </div>
            <div className="search--notification--profile">
                <div></div>
                <h2>Referral Management System</h2>
                <div className="notification--profile">
                    {/* <div className="picon lock">
                        <i className="ri-lock-line"></i>
                    </div>
                    <div className="picon bell">
                        <i className="ri-notification-2-line"></i>
                    </div>
                    <div className="picon chat">
                        <i className="ri-wechat-2-line"></i>
                    </div>
                    <div className="picon profile">
                        <img src="assets/images/profile.jpg" alt="" />
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default Header;