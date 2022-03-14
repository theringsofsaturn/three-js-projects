import React, { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useThree } from 'react-three-fiber';
import { BufferGeometry, Geometry, Material, Mesh, MeshLambertMaterial, Vector2 } from 'three';
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox'



const Selection = ({ setSelecting, setStart, setEnd, setSelection }) => {
  const { camera, scene, gl } = useThree();

  let selecting = useRef(false);
  let selectionBox = new SelectionBox(camera, scene);
  let selection = useRef<ThreeMesh>([]);
  let getCoords = (event: PointerEvent) => { return new Vector2(event.clientX, event.clientY) };

  let setColors = (ThreeMesh, number) => {
    for (let item of collection ) {
      if (item.material) {
        let material = item.material;
        material.emissive.set(color)
      }
    }
  }

  let appendSelection = (ThreeMesh) => {
    selection.current = Array.from(new Set(selection.current.concat(toAppend)));
    setSelection(selection.current);
  }

  let pointerDown = (event: PointerEvent) => {
    let { clientX, clientY, altKey, ctrlKey } = event;
    if (!altKey && !selecting.current) {
      let [startX, startY] = getCoords(event);
      setStart(new Vector2(clientX, clientY));
      setSelecting(true);
      selecting.current = true;
      if (!ctrlKey) {
        console.log("resetting colors", event)
        setColors(selection.current, 0x000000);
      }
      selectionBox.startPoint.set(startX, startY, 0.5);
      selectionBox.endPoint.set(startX, startY, 0.5);
    }
  }
  let pointerMove = (event: PointerEvent) => {
    if (selecting.current) {
      let { clientX, clientY } = event;
      let [endX, endY] = getCoords(event);
      setEnd(new Vector2(clientX, clientY));
      selectionBox.select();
      setColors(selectionBox.collection, 0x000000);

      selectionBox.endPoint.set(endX, endY, 0.5);
      selectionBox.select();
      
      setColors(selectionBox.collection, 0xffffff);
    }
  }
  let pointerUp = (event: PointerEvent) => {
    if (selecting.current || !event.button) {
      setSelecting(false);
      selecting.current = false;
      let { ctrlKey } = event;

      let [endX, endY] = getCoords(event);
      selectionBox.endPoint.set(endX, endY, 0.5);
      let curSelected = selectionBox.select();

      setEnd(null);
      setStart(null);

      if (ctrlKey) {
        appendSelection(curSelected)
      } else {
        setSelection(curSelected)
        selection.current = curSelected
      }
      
      setColors(selectionBox.collection, 0xffffff);
    }
  }

  useEffect(() => {
    gl.domElement.onpointermove = pointerMove;
    gl.domElement.onpointerup = pointerUp;
    gl.domElement.onpointerdown = pointerDown;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // disabled ESLint because we only want these listeners to be mounted once.

  return <></>;
}