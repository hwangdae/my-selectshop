import SignUp from "@/pages/signUp";
import ProfileUpdateContainer from "./ProfileUpdateContainer";
import Login from "@/pages/login";

export interface ModalProps {
    onClose: () => void;
  }

const ModalMap : { [key: string]: React.ComponentType<ModalProps> } = {
    profile : ProfileUpdateContainer,
    signUp : SignUp,
    login : Login,
}

export default ModalMap;