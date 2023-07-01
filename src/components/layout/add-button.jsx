import { Link } from "wouter";

const titleCase = (str)=>str.charAt(0).toUpperCase()+str.slice(1).toLowerCase();

export default function AddButton({name}){
    return (
<Link href={`/${name}/add`}>
                <button class="add"><i class="ri-add-line"></i>Add {titleCase(name)}</button>
            </Link>
    )
}