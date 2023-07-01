import { Link, useRoute } from "wouter";

export default function NavItem({ href, label, icon, iconColor }) {

    const [isActive] = useRoute(href);
    return <Link href={href}>
        <a className={isActive ? "active--link NavItem" : "NavItem"}>
            <span className="icon" style={{ color: iconColor }}><i className={`ri-${icon}`}></i></span>
            <span className="sidebar--item">{label}</span>
        </a>
    </Link>
}