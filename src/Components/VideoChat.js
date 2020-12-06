import React, { useState, useCallback } from "react";
import Lobby from "./Lobby";
import Room from "./Room";
import Photo360 from "./Photo360";
import { Forest, Office } from "../environments";

const VideoChat = () => {
    const [username, setUsername] = useState("");
    const [roomName, setRoomName] = useState("");
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [token, setToken] = useState(null);
    const [envAudio, setEnvAudio] = useState(Office.audio);
    const [envImg, setEnvImg] = useState(Office.img);
    const [muteAmbiental, setMuteAmbiental] = useState(false);

    const handleUsernameChange = useCallback((event) => {
        setUsername(event.target.value);
    }, []);

    const handleRoomNameChange = useCallback((event) => {
        setRoomName(event.target.value);
    }, []);

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            const data = await fetch(
                "https://backend-360-video-chat.herokuapp.com/video/token",
                {
                    method: "POST",
                    body: JSON.stringify({
                        identity: username,
                        room: roomName,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json());
            setToken(data.token);
        },
        [roomName, username]
    );

    const handleLogout = useCallback((event) => {
        setVideoLoaded(false);
        setToken(null);
    }, []);

    return (
        <>
            {token ? (
                <Room
                    roomName={roomName}
                    token={token}
                    handleLogout={handleLogout}
                    videoLoaded={videoLoaded}
                    setVideoLoaded={setVideoLoaded}
                    envImg={envImg}
                    muteAmbiental={muteAmbiental}
                    setMuteAmbiental={setMuteAmbiental}
                />
            ) : (
                <Lobby
                    username={username}
                    roomName={roomName}
                    handleUsernameChange={handleUsernameChange}
                    handleRoomNameChange={handleRoomNameChange}
                    handleSubmit={handleSubmit}
                    setEnvImg={setEnvImg}
                    setEnvAudio={setEnvAudio}
                    envImg={envImg}
                />
            )}
            {!videoLoaded && <Photo360 src={envImg} roomName={roomName} />}
            <audio
                src={envAudio}
                autoPlay={true}
                loop
                muted={muteAmbiental}
                type="audio/ogg"
            />
        </>
    );
};

export default VideoChat;
