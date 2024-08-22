import SignUp from "@/pages/signUp";
import Login from "@/pages/login";
import ProfileUpdateContainer from "./profileComponents/ProfileUpdateContainer";


export interface ModalProps {
    onClose: () => void;
  }

const ModalMap : { [key: string]: React.ComponentType<ModalProps> } = {
    profile : ProfileUpdateContainer,
    signUp : SignUp,
    login : Login,
}

export default ModalMap;