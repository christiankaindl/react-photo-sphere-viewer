import './App.css';
import { ReactPhotoSphereViewer, MarkersPlugin, LensflarePlugin } from 'react-photo-sphere-viewer';
import React from 'react';

function App() {
  const photoSphereRef = React.useRef();

  const handleClick = (instance) => {
    photoSphereRef.current.animate({
      yaw: 0,
      pitch: 0,
      zoom: 55,
      speed: '10rpm',
    });
  }

  const handleReady = (instance) => {
    const markersPlugs = instance.getPlugin(MarkersPlugin);
    if (!markersPlugs)
      return;
    console.log(markersPlugs);
    markersPlugs.addEventListener("select-marker", () => {
      console.log("asd");
    });
  }

  const plugins = [
    [
      MarkersPlugin,
      {
        // list of markers
        markers: [
          {
            // image marker that opens the panel when clicked
            id: "image",
            position: { yaw: '0.33deg', pitch: '0.1deg' },
            image: "pin-blue.png",
            anchor: "bottom center",
            size: { width: 32, height: 32 },
            tooltip: "Mountain peak. <b>Click me!</b>"
          },
          {
            // image marker rendered in the 3D scene
            id: "imageLayer",
            image: "drone.png",
            size: { width: 220, height: 220 },
            position: { yaw: '13.5deg', pitch: '-0.1deg' },
            tooltip: "Image embedded in the scene"
          }
        ]
      }
    ],
    [
      LensflarePlugin,
      {
        // list of lensflares
        lensflares: [
          {
            id: 'sun',
            position: { yaw: '145deg', pitch: '2deg' },
            type: 0,
          }
        ]
      }
    ]
  ];

  return (
    <div className="App">
      <ReactPhotoSphereViewer
        ref={photoSphereRef}
        src="Test_pano.jpg"
        littlePlanet={true}
        height={'100vh'}
        width={"100%"}
        onClick={handleClick}
        onReady={handleReady}
        plugins={plugins} />
    </div>
  );
}

export default App;
