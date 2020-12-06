import React from "react";
import { Forest, Office } from "../environments";

const Lobby = ({
    username,
    handleUsernameChange,
    roomName,
    handleRoomNameChange,
    handleSubmit,
    setEnvImg,
    setEnvAudio,
    envImg
}) => {
    const handleChange = (selectedEnv) => () => {
        setEnvImg(selectedEnv.img);
        setEnvAudio(selectedEnv.audio);
    };

    const handleCustomURL = (event) => {
        setEnvImg(event.target.value);
    }

    return (
        <div
            style={{
                position: "fixed",
                bottom: "10px",
                left: "10px",
                zIndex: "1000",
                padding: "50px 80px 50px 80px",
            }}
            className="card card-body"
        >
            <form onSubmit={handleSubmit}>
                <h2>Enter a room</h2>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="field"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="room">Room name:</label>
                    <input
                        type="text"
                        id="room"
                        value={roomName}
                        onChange={handleRoomNameChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="room">Environment:</label>

                    <button
                        type="button"
                        className="mr-2 btn btn-success"
                        onClick={handleChange(Forest)}
                    >
                        Forest
                    </button>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleChange(Office)}
                    >
                        Office
                    </button>
                </div>

                <div>
                    <label htmlFor="room">Background URL:</label>
                    <input
                        type="text"
                        id="room"
                        // value={envImg}
                        onChange={handleCustomURL}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Lobby;
