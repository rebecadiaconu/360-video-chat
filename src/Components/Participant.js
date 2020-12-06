import React, { useState, useEffect, useRef } from "react";
import Photo360 from "./Photo360";
import "aframe";

const Participant = ({
    participant,
    isLocal,
    roomName,
    videoLoaded,
    setVideoLoaded,
    envImg,
}) => {
    const [videoTracks, setVideoTracks] = useState([]);
    const [audioTracks, setAudioTracks] = useState([]);
    const videoRef = useRef();
    const audioRef = useRef();

    const trackpubsToTracks = (trackMap) =>
        Array.from(trackMap.values())
            .map((publication) => publication.track)
            .filter((track) => track !== null);

    useEffect(() => {
        setVideoTracks(trackpubsToTracks(participant.videoTracks));
        setAudioTracks(trackpubsToTracks(participant.audioTracks));

        const trackSubscribed = (track) => {
            if (track.kind === "video") {
                setVideoTracks((videoTracks) => [...videoTracks, track]);
            } else if (track.kind === "audio") {
                setAudioTracks((audioTracks) => [...audioTracks, track]);
            }
        };

        const trackUnsubscribed = (track) => {
            if (track.kind === "video") {
                setVideoTracks((videoTracks) =>
                    videoTracks.filter((v) => v !== track)
                );
            } else if (track.kind === "audio") {
                setAudioTracks((audioTracks) =>
                    audioTracks.filter((a) => a !== track)
                );
            }
        };

        participant.on("trackSubscribed", trackSubscribed);
        participant.on("trackUnsubscribed", trackUnsubscribed);

        return () => {
            setVideoTracks([]);
            setAudioTracks([]);
            participant.removeAllListeners();
        };
    }, [participant]);

    useEffect(() => {
        const videoTrack = videoTracks[0];
        if (videoTrack) {
            videoTrack.attach(videoRef.current);
            return () => {
                videoTrack.detach();
            };
        }
    }, [videoTracks]);

    useEffect(() => {
        const audioTrack = audioTracks[0];
        if (audioTrack) {
            audioTrack.attach(audioRef.current);
            return () => {
                audioTrack.detach();
            };
        }
    }, [audioTracks]);

    return (
        <div className="participant">
            {isLocal ? (
                <video
                    style={{
                        position: "fixed",
                        bottom: "10px",
                        left: "10px",
                        zIndex: "1001",
                        width: "300px",
                        height: "auto",
                    }}
                    ref={videoRef}
                    autoPlay
                />
            ) : (
                <Photo360
                    videoRef={videoRef}
                    roomName={roomName}
                    participantId={participant.identity}
                    videoLoaded={videoLoaded}
                    setVideoLoaded={setVideoLoaded}
                    src={envImg}
                />
            )}
            <audio ref={audioRef} autoPlay={true} muted={false} />
        </div>
    );
};

export default Participant;
