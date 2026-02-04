// import { Link } from "react-router-dom";
// import { MapPin, Star } from "lucide-react";
// import "../../styles/InstructorCard.css";

// const InstructorCard = ({ instructor }) => {
//     return (
//         <div className="instructor-card">
//             {/* Top */}
//             <div className="instructor-top">
//                 <img
//                     className="instructor-avatar"
//                     src={instructor.image || "/placeholder-avatar.jpg"}
//                     alt={instructor.fullName}
//                 />
//                 <div className="instructor-info">
//                     <h3 className="instructor-name">
//                         {instructor.fullName}
//                     </h3>

//                     <div className="instructor-location">
//                         <MapPin size={14} />
//                         {instructor.workArea}
//                     </div>

//                     <div className="instructor-experience">
//                         {instructor.experienceYears} שנות ניסיון
//                     </div>

//                     {instructor.rating > 0 && (
//                         <div className="instructor-rating">
//                             <Star size={14} />
//                             {instructor.rating.toFixed(1)}
//                         </div>
//                     )}
//                 </div>


//             </div>

//             {/* Bottom */}
//             <div className="instructor-footer">
//                 <Link
//                     to={`/instructor/${instructor._id}`}
//                     className="instructor-cta"
//                 >
//                     צפייה בפרופיל
//                 </Link>
//                 <div className="instructor-price">
//                     ₪{instructor.hourlyRate}
//                     <span> / שיעור</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default InstructorCard;
