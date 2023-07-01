import { useLocation, useRouter } from "wouter";

const FormHeading = ({ heading, cancelUrl }) => {

    const [location, setLocation] = useLocation();
    const router = useRouter();
     return (
        <div class="d-flex justify-content-between">
            <h3 className="section--title">{heading}</h3>
            <button type="button" class="close" aria-label="Close" onClick={() => window.history.back()}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default FormHeading;