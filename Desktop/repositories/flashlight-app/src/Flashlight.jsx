import React, { useState } from "react";

const Flashlight = () => {
  const [torchOn, setTorchOn] = useState(false);

  const toggleFlashlight = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      const track = stream.getVideoTracks()[0];

      if (track.getCapabilities().torch) {
        track.applyConstraints({
          advanced: [{ torch: !torchOn }],
        });
        setTorchOn(!torchOn);
      } else {
        alert("Torch not supported on this device.");
      }
    } catch (error) {
      console.error("Error accessing camera or torch:", error);
      alert("An error occurred while trying to access the flashlight.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={toggleFlashlight}>
        {torchOn ? "Turn Off Flashlight" : "Turn On Flashlight"}
      </button>
    </div>
  );
};

export default Flashlight;
