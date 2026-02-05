import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "../../styles/BackToHome.css";

const BackToHome = () => {
    return (
        <Link to="/" className="back-to-home">
            <ArrowRight size={16} />
            <span className="back-to-home-text">חזרה למסך הבית</span>
        </Link>
    );
};

export default BackToHome;
