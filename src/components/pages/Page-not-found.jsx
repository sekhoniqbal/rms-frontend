import { Link } from "wouter";

export default function PageNotFound() {
    return (
        <div className="PageNotFound">

            <div className="title">
                <h2 className="section--title">Page Not Found</h2>
            </div>
            <Link href="/">
                <button className="btn btn-secondary">Go home</button>
            </Link>
        </div>
    )
}