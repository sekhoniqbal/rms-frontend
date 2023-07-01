import { Link, useRoute, useLocation } from 'wouter';
import NavItem from './nav-item';

const Sidebar = () => {
    return <div className="Sidebar">
        <ul class="sidebar--items">
            <li><NavItem href="/" label="Dashboard" icon="layout-grid-line" iconColor={"#c5bc58"} /></li>
            <li><NavItem href="/referrals" label="Referrals" icon="calendar-2-line" iconColor={"#a280e9"} /></li>
            <li><NavItem href="/providers" label="Providers" icon="user-2-line" iconColor={"#85ade3"} /></li>
            <li><NavItem href="/patients" label="Patients" icon="user-line" iconColor={"#e36ac8"} /></li>
            <li><NavItem href="/specialities" label="Specialities" icon="line-chart-line" iconColor={"#70d7a5"} /></li>
        </ul>
        <ul class="sidebar--bottom-items">
            {/* <li><NavItem href="/settings" label="Settings" icon="settings-3-line" iconColor={"#e86786"} /></li>
            <li><NavItem href="/logout" label="Logout" icon="logout-box-r-line" iconColor={"#f1d243"} /></li> */}
        </ul>
    </div>
}

export default Sidebar;