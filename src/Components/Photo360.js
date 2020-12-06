import React, { useEffect } from "react";
import "aframe";
import { Entity, Scene } from "aframe-react";

const Photo360 = ({
    videoRef,
    src,
    participantId,
    roomName,
    videoLoaded,
    setVideoLoaded,
}) => {
    useEffect(() => {
        if (participantId) {
            setVideoLoaded(true);
        }
    }, [participantId, setVideoLoaded]);

    return (
        <div
            style={
                videoRef && {
                    position: "fixed",
                    zIndex: "1000",
                }
            }
        >
            <Scene vr-mode-ui="enabled:false">
                <a-assets>
                    <img id="skyTexture" src={src} />
                    <video
                        id="videoFeed"
                        src=""
                        ref={videoRef}
                        autoPlay
                    ></video>
                </a-assets>

                <Entity primitive="a-sky" src="#skyTexture" />

                {roomName && (
                    <Entity
                        text={{
                            value: `Room Name: ${roomName}`,
                            align: "center",
                        }}
                        position={{ x: 0, y: 1.82, z: -0.5 }}
                    />
                )}

                {participantId && (
                    <Entity
                        text={{ value: `${participantId}`, align: "center" }}
                        position={{ x: 0, y: 1.79, z: -0.7 }}
                    />
                )}

                {participantId && (
                    <Entity
                        primitive="a-video"
                        src="#videoFeed"
                        width="16"
                        height="12"
                        position="0 0 -20"
                    />
                )}
            </Scene>
        </div>
    );
};

export default Photo360;
