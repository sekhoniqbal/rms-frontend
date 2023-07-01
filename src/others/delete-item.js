import { toast } from "react-hot-toast"

export default function deleteItem({asyncDeleteItem, item, itemType="item",onSuccess=()=>{}}) {
   return asyncDeleteItem(item)
        .then(() => toast.success(`${itemType} deleted successfully`))
        .then(() => onSuccess())
        .catch((error) => toast.error(`failed to delete ${itemType}: ` + (error?.response?.data?.message || error.message)))
}