// //Dashboard.js

// import { useState } from "react";
// import { FaComments } from "react-icons/fa";
// import ChatUser from "./ChatUser";
// import DashMenuBar from "./DashMenuBar";
// import "./Dashboard.css";
// import { Outlet, Link } from "react-router-dom";
// import { FaHome} from "react-icons/fa";
// import { BiHistory } from "react-icons/bi";

// function Dashboard() {
//   const [showChat, setShowChat] = useState(false);

//   return (
//     <div className="dashboard-wrapper">
//       <DashMenuBar />

//       <nav className="dashboard-navbar">
//         <Link to="/dashboard/Houserent" className="Dashboard-button"  ><FaHome /> Rent</Link>
//         <Link to="/dashboard/History" className="Dashboard-button"> <BiHistory size={24} color="white" /></Link>
//         <Link to="/dashboard/lecture" className="Dashboard-button">
//           <FaVideo /> Lecture
//         </Link>
//         <button
//           className="Dashboard-button"
//           onClick={() => setShowChat(!showChat)}
//         >
//           <FaComments /> Chat
//         </button>
//       </nav>

//       <div className="dashboard-content">
//         <Outlet />
//         {showChat && (
//           <div className="chat-popup">
//             <ChatUser />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// export default Dashboard;

import { useState } from "react";
import { FaComments, FaHome } from "react-icons/fa";
import { BiHistory } from "react-icons/bi";
import { MdCastForEducation } from "react-icons/md";
import { BsCameraVideo } from "react-icons/bs"; // Recording icon
import { Link, Outlet } from "react-router-dom";

import ChatUser from "./ChatUser";
import DashMenuBar from "./DashMenuBar";

import "./Dashboard.css";

function Dashboard() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="dashboard-wrapper">
      <DashMenuBar />

      <nav className="dashboard-navbar">
      
        <Link to="/dashboard/History" className="Dashboard-button">
          <BiHistory size={24} color="white" />
        </Link>

        {/* Live Lecture */}
        <Link to="/dashboard/student-lecture" className="Dashboard-button">
          <MdCastForEducation /> Live Lecture
        </Link>

        {/* Recorded Lectures */}
        <Link to="/dashboard/recorded-lectures" className="Dashboard-button">
          <BsCameraVideo /> Recordings
        </Link>

        {/* Chat */}
        <button
          className="Dashboard-button"
          onClick={() => setShowChat(!showChat)}
        >
          <FaComments /> Chat
        </button>
      </nav>

      <div className="dashboard-content">
        <Outlet />

        {showChat && (
          <div className="chat-popup">
            <ChatUser />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
