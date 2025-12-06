// // src/TeacherLive.js
// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import "./TeacherLive.css";

// const socket = io("http://localhost:5000");
// const roomId = "class101";

// export default function TeacherLive() {
//   const localVideoRef = useRef(null);
//   const [pending, setPending] = useState([]); 
//   const pcsRef = useRef({});
//   const localStreamRef = useRef(null);

//   useEffect(() => {
//     socket.emit("join-lecture", { roomId, role: "teacher" });

//     const onStudentRequest = (req) => {
//       // add single request (server also sends full list via "pending-requests")
//       setPending(prev => {
//         // avoid duplicates: filter by socketId
//         if (prev.find(p => p.socketId === req.socketId)) return prev;
//         return [...prev, req];
//       });
//     };

//     const onPendingList = (list) => {
//       setPending(list || []);
//     };

//     const onAnswer = async ({ from, answer }) => {
//       const pc = pcsRef.current[from];
//       if (!pc) return;
//       await pc.setRemoteDescription(new RTCSessionDescription(answer));
//     };

//     const onIce = async ({ from, candidate }) => {
//       const pc = pcsRef.current[from];
//       if (pc && candidate) {
//         try { await pc.addIceCandidate(new RTCIceCandidate(candidate)); } catch (e) { console.error(e); }
//       }
//     };

//     socket.on("student-request", onStudentRequest);
//     socket.on("pending-requests", onPendingList);
//     socket.on("answer", onAnswer);
//     socket.on("ice-candidate", onIce);

//     return () => {
//       socket.off("student-request", onStudentRequest);
//       socket.off("pending-requests", onPendingList);
//       socket.off("answer", onAnswer);
//       socket.off("ice-candidate", onIce);
//       // do not call socket.disconnect() here if you want socket shared across components;
//       // if you want to fully close socket when component unmounts, call socket.disconnect();
//       if (localStreamRef.current) {
//         localStreamRef.current.getTracks().forEach(t => t.stop());
//       }
//       Object.values(pcsRef.current || {}).forEach(pc => pc.close());
//     };
//   }, []);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       localStreamRef.current = stream;
//       if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//     } catch (err) {
//       alert("Camera / Mic permission required!");
//     }
//   };

//   const approveStudent = async ({ socketId }) => {
//     socket.emit("approve-student", { roomId, studentSocketId: socketId });

//     const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });

//     pc.onicecandidate = (e) => {
//       if (e.candidate) socket.emit("ice-candidate", { targetId: socketId, candidate: e.candidate });
//     };

//     if (!localStreamRef.current) await startCamera();
//     localStreamRef.current.getTracks().forEach(track => pc.addTrack(track, localStreamRef.current));

//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);

//     pcsRef.current[socketId] = pc;
//     socket.emit("offer", { targetStudentId: socketId, offer: pc.localDescription });

//     setPending(prev => prev.filter(p => p.socketId !== socketId));
//   };

//   return (
//     <div className="teacher-container">
//       <h2 className="teacher-title">🎥 Teacher Live Lecture</h2>

//       <video
//         ref={localVideoRef}
//         autoPlay
//         muted
//         playsInline
//         className="teacher-video"
//       />

//       <div className="controls">
//         <button className="start-btn" onClick={startCamera}>Start Camera</button>
//       </div>

//       <h3 className="pending-title">Pending Join Requests</h3>

//       <ul className="pending-list">
//         {pending.length === 0 && <li className="empty">No pending requests</li>}
//         {pending.map(req => (
//           <li className="pending-item" key={req.socketId}>
//             <span className="pending-name">{req.name} ({req.id})</span>
//             <button className="approve-btn" onClick={() => approveStudent(req)}>Approve</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// src/TeacherLive.js
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./TeacherLive.css";

// Socket URL (production + local)
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";
const socket = io(SOCKET_URL);

const roomId = "class101";

export default function TeacherLive() {
  const localVideoRef = useRef(null);
  const [pending, setPending] = useState([]);
  const pcsRef = useRef({});
  const localStreamRef = useRef(null);

  // ────────────────────────────────
  // JOIN LECTURE (Teacher)
  // ────────────────────────────────
  useEffect(() => {
    socket.emit("join-lecture", { roomId, role: "teacher" });

    const onStudentRequest = (req) => {
      setPending((prev) => {
        if (prev.find((p) => p.socketId === req.socketId)) return prev;
        return [...prev, req];
      });
    };

    const onPendingList = (list) => {
      setPending(list || []);
    };

    const onAnswer = async ({ from, answer }) => {
      const pc = pcsRef.current[from];
      if (!pc) return;
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    };

    const onIce = async ({ from, candidate }) => {
      const pc = pcsRef.current[from];
      if (pc && candidate) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {
          console.error("ICE add failed:", e);
        }
      }
    };

    const onStudentLeft = ({ socketId }) => {
      const pc = pcsRef.current[socketId];
      if (pc) pc.close();
      delete pcsRef.current[socketId];

      setPending((prev) => prev.filter((p) => p.socketId !== socketId));
    };

    socket.on("student-request", onStudentRequest);
    socket.on("pending-requests", onPendingList);
    socket.on("answer", onAnswer);
    socket.on("ice-candidate", onIce);
    socket.on("student-left", onStudentLeft);

    return () => {
      socket.off("student-request", onStudentRequest);
      socket.off("pending-requests", onPendingList);
      socket.off("answer", onAnswer);
      socket.off("ice-candidate", onIce);
      socket.off("student-left", onStudentLeft);

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
      }

      Object.values(pcsRef.current).forEach((pc) => pc.close());
      pcsRef.current = {};
    };
  }, []);

  // ────────────────────────────────
  // START CAMERA
  // ────────────────────────────────
  // const startCamera = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       video: true,
  //       audio: true,
  //     });

  //     localStreamRef.current = stream;
  //     localVideoRef.current.srcObject = stream;
  //   } catch (e) {
  //     alert("Please allow camera/mic permission.");
  //   }
  // };
const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStreamRef.current = stream;

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    return true; 
  } catch (err) {
    console.error("camera error:", err);
    return false;
  }
};

  // ────────────────────────────────
  // START SCREEN SHARE
  // ────────────────────────────────
  // const startScreenShare = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getDisplayMedia({
  //       video: true,
  //       audio: true,
  //     });

  //     localStreamRef.current = stream;
  //     localVideoRef.current.srcObject = stream;

  //     // Replace live video sender → screen sender
  //     Object.values(pcsRef.current).forEach((pc) => {
  //       const senders = pc.getSenders();

  //       const videoTrack = stream.getVideoTracks()[0];
  //       const audioTrack = stream.getAudioTracks()[0];

  //       if (videoTrack) {
  //         const sender = senders.find((s) => s.track && s.track.kind === "video");
  //         if (sender) sender.replaceTrack(videoTrack);
  //       }
  //       if (audioTrack) {
  //         const sender = senders.find((s) => s.track && s.track.kind === "audio");
  //         if (sender) sender.replaceTrack(audioTrack);
  //       }
  //     });

  //     stream.getVideoTracks()[0].onended = () => {
  //       alert("Screen sharing stopped.");
  //     };
  //   } catch (e) {
  //     console.error(e);
  //     alert("Screen share permission denied.");
  //   }
  // };

  // START SCREEN SHARE (safer version)
const startScreenShare = async () => {
  try {
    // Some browsers complain when audio:true is passed; try without audio first
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { cursor: "always" },
      audio: false
    });

    // set local stream and UI
    localStreamRef.current = stream;
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;

    // Replace outgoing video track on all peer connections
    Object.values(pcsRef.current).forEach((pc) => {
      try {
        const senders = pc.getSenders();
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack) {
          const sender = senders.find((s) => s.track && s.track.kind === "video");
          if (sender) sender.replaceTrack(videoTrack);
        }
      } catch (err) {
        console.warn("replaceTrack error:", err);
      }
    });

    // handle when user stops screen share
    const vTrack = stream.getVideoTracks()[0];
    if (vTrack) {
      vTrack.onended = () => {
        // optionally revert to camera automatically if you want:
        // startCamera();
        alert("Screen sharing stopped.");
      };
    }

    return true;
  } catch (err) {
    // handle common errors specifically
    console.error("getDisplayMedia error:", err);
    if (err.name === "NotAllowedError" || err.name === "SecurityError") {
      alert("Screen share permission denied. Please allow screen share in the browser dialog.");
    } else if (err.name === "NotFoundError") {
      alert("No display capture source found.");
    } else {
      alert("Screen share failed. See console for details.");
    }
    return false;
  }
};

  // ────────────────────────────────
  // APPROVE STUDENT (SEND OFFER)
  // ────────────────────────────────
  const approveStudent = async ({ socketId }) => {
    socket.emit("approve-student", {
      roomId,
      studentSocketId: socketId,
    });

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("ice-candidate", {
          to: socketId,
          candidate: e.candidate,
        });
      }
    };

    // If student sends audio stream
    pc.ontrack = (event) => {
      const audio = document.createElement("audio");
      audio.srcObject = event.streams[0];
      audio.autoplay = true;
      document.body.appendChild(audio);
    };

    // if (!localStreamRef.current) await startCamera();

    // localStreamRef.current.getTracks().forEach((track) => {
    //   pc.addTrack(track, localStreamRef.current);
    // });
// Ensure camera started properly
if (!localStreamRef.current) {
  const started = await startCamera();
  if (!started || !localStreamRef.current) {
    alert("Please click Start Camera and allow permission.");
    return;
  }
}

// Now safe to add tracks
localStreamRef.current.getTracks().forEach((track) => {
  pc.addTrack(track, localStreamRef.current);
});

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    pcsRef.current[socketId] = pc;

    socket.emit("offer", {
      to: socketId,
      offer: pc.localDescription,
    });

    setPending((prev) => prev.filter((p) => p.socketId !== socketId));
  };

  // ────────────────────────────────
  // UI
  // ────────────────────────────────
  return (
    <div className="teacher-container">
      <h2 className="teacher-title">🎥 Teacher Live Lecture</h2>

      <video
        ref={localVideoRef}
        autoPlay
        muted
        playsInline
        className="teacher-video"
      />

      <div className="controls">
        <button className="start-btn" onClick={startCamera}>
          Start Camera
        </button>

        <button className="start-btn" onClick={startScreenShare}>
          Share Screen
        </button>
      </div>

      <h3 className="pending-title">Pending Join Requests</h3>

      <ul className="pending-list">
        {pending.length === 0 && <li className="empty">No pending requests</li>}

        {pending.map((req) => (
          <li className="pending-item" key={req.socketId}>
            <span className="pending-name">
              {req.name} ({req.socketId})
            </span>
            <button className="approve-btn" onClick={() => approveStudent(req)}>
              Approve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
