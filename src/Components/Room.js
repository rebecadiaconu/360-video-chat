import React, { useState, useEffect } from "react";
import Video from "twilio-video";
import Participant from "./Participant";

const Room = ({
    roomName,
    token,
    handleLogout,
    videoLoaded,
    setVideoLoaded,
    envImg,
    muteAmbiental,
    setMuteAmbiental    
}) => {
    const [room, setRoom] = useState(null);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const participantConnected = (participant) => {
            setParticipants((prevParticipants) => [
                ...prevParticipants,
                participant,
            ]);
        };

        const participantDisconnected = (participant) => {
            setParticipants((prevParticipants) =>
                prevParticipants.filter((p) => p !== participant)
            );
        };

        Video.connect(token, {
            name: roomName,
        }).then((room) => {
            setRoom(room);
            room.on("participantConnected", participantConnected);
            room.on("participantDisconnected", participantDisconnected);
            room.participants.forEach(participantConnected);
        });

        return () => {
            setRoom((currentRoom) => {
                if (
                    currentRoom &&
                    currentRoom.localParticipant.state === "connected"
                ) {
                    currentRoom.localParticipant.tracks.forEach(
                        (trackPublication) => {
                            trackPublication.track.stop();
                        }
                    );
                    currentRoom.disconnect();
                    return null;
                } else {
                    return currentRoom;
                }
            });
        };
    }, [roomName, token]);

    const remoteParticipants = participants.map((participant) => (
        <Participant
            key={participant.sid}
            participant={participant}
            roomName={roomName}
            videoLoaded={videoLoaded}
            setVideoLoaded={setVideoLoaded}
            envImg={envImg}
        />
    ));

    return (
        <div className="room">
            <h2>Room: {roomName}</h2>
            <button
                style={{
                    position: "fixed",
                    zIndex: "1001",
                    right: "110px",
                    top: "15px"
                }}
                className="btn btn-primary"
                onClick={() => setMuteAmbiental(!muteAmbiental)}
            >
                {muteAmbiental ? "🔈" : "🔊"}
            </button>
            <button
                style={{
                    position: "fixed",
                    zIndex: "1001",
                    right: "15px",
                    top: "15px"
                }}
                className="btn btn-danger"
                onClick={handleLogout}
            >
                Log out
            </button>
            <div className="local-participant">
                {room && (
                    <Participant
                        key={room.localParticipant.sid}
                        participant={room.localParticipant}
                        isLocal
                    />
                )}
            </div>
            <h3>Remote Participants</h3>
            <div className="remote-participants">{remoteParticipants}</div>
        </div>
    );
};

export default Room;
