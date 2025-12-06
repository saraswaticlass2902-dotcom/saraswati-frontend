// src/StudentLive.js
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./StudentLive.css";

const socket = io("http://localhost:5000");
const roomId = "class101";

export default function StudentLive() {
  const videoRef = useRef(null);
  const pcRef = useRef(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    socket.emit("join-lecture", { roomId, role: "student" });

    socket.on("request-sent", () => setStatus("requested"));
    socket.on("approved", ({ roomId: r, teacherSocketId }) => {
      setStatus("approved");
    });

    socket.on("offer", async ({ from, offer }) => {
      await setupPeerAndAnswer(offer, from);
    });

    socket.on("ice-candidate", async ({ from, candidate }) => {
      if (pcRef.current && candidate) {
        try { await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate)); } catch (e) { console.error(e); }
      }
    });

    return () => {
      socket.off("request-sent");
      socket.off("approved");
      socket.off("offer");
      socket.off("ice-candidate");
      if (pcRef.current) pcRef.current.close();
      // optionally socket.disconnect()
    };
  }, []);

  const requestJoin = (name = "Student", id = `stu-${Math.floor(Math.random()*1000)}`) => {
    socket.emit("request-join", { roomId, studentId: id, name });
    setStatus("requested");
  };

  const setupPeerAndAnswer = async (offer, teacherSocketId) => {
    const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
    pcRef.current = pc;

    pc.ontrack = (evt) => {
      if (videoRef.current) videoRef.current.srcObject = evt.streams[0];
    };

    pc.onicecandidate = (e) => {
      if (e.candidate) socket.emit("ice-candidate", { targetId: teacherSocketId, candidate: e.candidate });
    };

    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    socket.emit("answer", { targetTeacherId: teacherSocketId, answer: pc.localDescription });
    setStatus("streaming");
  };

  return (
    <div className="student-live-container">
      <h2>🎥 Live Lecture (Student)</h2>
      <video ref={videoRef} autoPlay playsInline controls className="student-video" style={{ width: 600 }} />
      <p className="status">Status: {status}</p>

      <div>
        {status === "idle" && <button onClick={() => requestJoin("Vijay", "stu001")}>Request to Join</button>}
        {status === "requested" && <p>Request sent. Waiting for teacher approval...</p>}
      </div>
    </div>
  );
}

