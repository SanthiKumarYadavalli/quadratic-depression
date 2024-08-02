import React from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import './card.css';

const VolunteerCard = ({ card }) => {
  const image = "https://via.placeholder.com/400";

  return (
    <div className='card p-8 border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50'>
      <img
        src={image}
        alt="image"
        className="cardImg"
      />
      <div className="mb-8 card-data mt-8">
        <h4 className="font-bold text-2xl">{card.name}</h4>
        <p className="mt-2 text-white-900">ID: {card.username}</p>
        <p className="mt-2 text-white-900">Branch: {card.branch}</p>
      </div>
      <div className="button-container mb-4">
        <a href={`tel:+91${card.phone}`} className="icon-button">
          <FaPhoneVolume />
        </a>
        <a href={`mailto:${card.email}`} className="icon-button">
          <MdEmail />
        </a>
        <a href={`https://wa.me/+91${card.phone}`} className="icon-button">
          <FaWhatsapp />
        </a>
      </div>
    </div>

  );
};

export default VolunteerCard;



// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
//   Tooltip,
// } from "@material-tailwind/react";

// function VolunteerCard() {
//   return (
//     <Card className="w-96">
//       <CardHeader floated={false} className="h-80">
//         <img
//           src="https://via.placeholder.com/320"
//           alt="profile-picture"
//         />
//       </CardHeader>
//       <CardBody className="text-center">
//         <Typography variant="h4" color="blue-gray" className="mb-2">
//           Natalie Paisley
//         </Typography>
//         <Typography color="blue-gray" className="font-medium" textGradient>
//           CEO / Co-Founder
//         </Typography>
//       </CardBody>
//       <CardFooter className="flex justify-center gap-7 pt-2">
//         <Tooltip content="Like">
//           <Typography
//             as="a"
//             href="#facebook"
//             variant="lead"
//             color="blue"
//             textGradient
//           >
//             <i className="fab fa-facebook" />
//           </Typography>
//         </Tooltip>
//         <Tooltip content="Follow">
//           <Typography
//             as="a"
//             href="#twitter"
//             variant="lead"
//             color="light-blue"
//             textGradient
//           >
//             <i className="fab fa-twitter" />
//           </Typography>
//         </Tooltip>
//         <Tooltip content="Follow">
//           <Typography
//             as="a"
//             href="#instagram"
//             variant="lead"
//             color="purple"
//             textGradient
//           >
//             <i className="fab fa-instagram" />
//           </Typography>
//         </Tooltip>
//       </CardFooter>
//     </Card>
//   );
// }


// export default VolunteerCard;
